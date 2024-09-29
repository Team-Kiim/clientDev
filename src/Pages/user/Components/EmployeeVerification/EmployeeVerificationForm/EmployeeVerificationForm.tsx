import axios from 'axios';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import EmailField from '@/Pages/user/Components/EmployeeVerification/EmployeeVerificationForm/EmailField.tsx';
import VerificationCodeField from '@/Pages/user/Components/EmployeeVerification/EmployeeVerificationForm/VerificationCodeField.tsx';
import TOAST_OPTIONS from '@/Constants/toastOptions.ts';
import 'react-toastify/dist/ReactToastify.css';

interface CorpInfo {
    corpName: string;
    corpEmailDomain: string;
}

interface FormValues {
    email: string;
    verificationCode: string;
}

interface Props {
    selectedCorpInfo: CorpInfo;
    closeModal(): void;
}

export default function EmployeeVerificationForm({ selectedCorpInfo, closeModal }: Props) {
    const queryClient = useQueryClient();

    const [isRequestingVerification, setIsRequestingVerification] = useState(false);

    const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);

    const formMethods = useForm<FormValues>({
        mode: 'onBlur',
        defaultValues: {
            email: '',
            verificationCode: '',
        },
    });

    const { mutate: verifyEmployee, isPending } = useMutation({
        mutationFn: ({
            corpName,
            email,
            verificationCode,
        }: {
            corpName: string;
            email: string;
            verificationCode: string;
        }) => {
            return axios.post('/api/corps/email-auth/code', {
                name: corpName,
                email,
                code: verificationCode,
            });
        },

        onSuccess: () => {
            toast.success(<p className={'text-[0.85rem]'}>현직자 인증에 성공하였습니다.</p>, TOAST_OPTIONS);
            closeModal();
        },

        onError: () => {
            toast.error(
                <p className={'text-[0.85rem] leading-relaxed'}>
                    현직자 인증에 실패하였습니다. 인증코드를 확인하거나, 잠시 후 다시 시도해주세요.
                </p>,
                TOAST_OPTIONS,
            );
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] }).catch();
        },
    });

    const onSubmit: SubmitHandler<FormValues> = data => {
        const email = data.email.replace(/\s/gi, '');

        const verificationCode = data.verificationCode.replace(/\s/gi, '');

        verifyEmployee({
            email,
            verificationCode,
            corpName: selectedCorpInfo.corpName,
        });
    };

    return (
        <FormProvider {...formMethods}>
            <form className={'flex w-full flex-col gap-y-10'} onSubmit={formMethods.handleSubmit(onSubmit)}>
                <div className={'flex flex-col gap-y-6'}>
                    <EmailField
                        selectedCorpInfo={selectedCorpInfo}
                        isRequestingVerification={isRequestingVerification}
                        updateIsRequestingVerification={(isRequestingVerification: boolean) => {
                            setIsRequestingVerification(isRequestingVerification);
                        }}
                        isVerificationCodeSent={isVerificationCodeSent}
                        markAsVerificationCodeSent={() => {
                            setIsVerificationCodeSent(true);
                        }}
                    />
                    <VerificationCodeField
                        isRequestingVerification={isRequestingVerification}
                        isVerificationCodeSent={isVerificationCodeSent}
                    />
                </div>
                <button
                    className={
                        'rounded-2xl bg-gradient-to-r from-plump-purple-600 to-rose-500 py-3.5 text-[0.9rem] font-bold text-white transition-all hover:opacity-90 disabled:opacity-75'
                    }
                    disabled={isPending}
                >
                    현직자 인증
                </button>
            </form>
        </FormProvider>
    );
}

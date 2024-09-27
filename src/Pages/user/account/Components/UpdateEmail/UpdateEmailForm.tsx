import axios from 'axios';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewEmailField from '@/Pages/user/account/Components/UpdateEmail/NewEmailField.tsx';
import VerificationCodeField from '@/Pages/user/account/Components/UpdateEmail/VerificationCodeField.tsx';
import TOAST_OPTIONS from '@/Constants/toastOptions.ts';

interface FormValues {
    newEmail: string;
    verificationCode: string;
}

export default function UpdateEmailForm() {
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    const [isRequestingVerification, setIsRequestingVerification] = useState(false);

    const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);

    const queryClient = useQueryClient();

    const formMethods = useForm<FormValues>({
        mode: 'onBlur',
        defaultValues: {
            newEmail: '',
            verificationCode: '',
        },
    });

    const onSubmit: SubmitHandler<FormValues> = async data => {
        const newEmail = data.newEmail.replace(/\s/gi, '');
        try {
            await axios.patch('/api/member/email', newEmail);
            toast.success(<p className={'text-[0.85rem]'}>새 이메일로 변경되었습니다.</p>, TOAST_OPTIONS);
            queryClient
                .invalidateQueries({
                    queryKey: ['user'],
                })
                .catch();
            setIsVerificationCodeSent(false);
            setIsRequestingVerification(false);
            setIsEmailVerified(false);
            formMethods.reset();
        } catch (error) {
            toast.error(
                <p className={'text-[0.85rem] leading-relaxed'}>
                    이메일 변경에 실패하였습니다.
                    <br />
                    잠시 후 다시 시도해주세요.
                </p>,
                TOAST_OPTIONS,
            );
        }
    };

    return (
        <FormProvider {...formMethods}>
            <form className={'flex w-full flex-col gap-y-10'} onSubmit={formMethods.handleSubmit(onSubmit)}>
                <div className={'flex w-full flex-col gap-y-4'}>
                    <NewEmailField
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
                        isEmailVerified={isEmailVerified}
                        markAsEmailVerified={() => {
                            setIsEmailVerified(true);
                        }}
                    />
                </div>
                <div className={'flex w-full justify-end'}>
                    <button
                        className={
                            'rounded-2xl border border-slate-300 px-4 py-2 text-[0.85rem] font-bold transition-all enabled:hover:bg-slate-50  disabled:opacity-50'
                        }
                        type={'submit'}
                        disabled={!isEmailVerified}
                    >
                        변경
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}

import axios from 'axios';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import CurrentPasswordField from '@/Pages/user/account/Components/UpdatePassword/CurrentPasswordField.tsx';
import NewPasswordField from '@/Pages/user/account/Components/UpdatePassword/NewPasswordField.tsx';
import ConfirmPasswordField from '@/Pages/user/account/Components/UpdatePassword/ConfirmPasswordField.tsx';
import TOAST_OPTIONS from '@/Constants/toastOptions.ts';
import 'react-toastify/dist/ReactToastify.css';

interface FormValues {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export default function UpdatePasswordForm() {
    const [isPasswordVerified, setIsPasswordVerified] = useState(false);

    const [isRequestingVerification, setIsRequestingVerification] = useState(false);

    const formMethods = useForm<FormValues>({
        mode: 'onBlur',
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    const { isSubmitting } = formMethods.formState;

    const onSubmit: SubmitHandler<FormValues> = async data => {
        const newPassword = data.newPassword.replace(/\s/g, '');
        const confirmPassword = data.confirmPassword.replace(/\s/g, '');

        try {
            await axios.patch('/api/member/password', {
                newPassword,
                checkPassword: confirmPassword,
            });
            toast.success(<p className={'text-[0.85rem]'}>새 비밀번호로 변경되었습니다.</p>, TOAST_OPTIONS);
            setIsPasswordVerified(false);
            setIsRequestingVerification(false);
            formMethods.reset();
        } catch (error) {
            toast.error(
                <p className={'text-[0.85rem] leading-relaxed'}>
                    비밀번호 변경에 실패하였습니다.
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
                    <CurrentPasswordField
                        isRequestingVerification={isRequestingVerification}
                        updateIsRequestingVerification={isRequestingVerification => {
                            setIsRequestingVerification(isRequestingVerification);
                        }}
                        isPasswordVerified={isPasswordVerified}
                        markAsPasswordVerified={() => {
                            setIsPasswordVerified(true);
                        }}
                    />
                    <div className={'flex w-full flex-col gap-y-7'}>
                        <NewPasswordField isPasswordVerified={isPasswordVerified} />
                        <ConfirmPasswordField isPasswordVerified={isPasswordVerified} />
                    </div>
                </div>
                <div className={'flex w-full justify-end'}>
                    <button
                        className={
                            'rounded-2xl border border-slate-300 px-4 py-2 text-[0.85rem] font-bold transition-all enabled:hover:bg-slate-50  disabled:opacity-50'
                        }
                        type={'submit'}
                        disabled={!isPasswordVerified || isSubmitting}
                    >
                        변경
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}

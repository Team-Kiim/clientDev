import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import PasswordVerificationField from '@/Pages/user/account/Components/PasswordUpdate/PasswordVerificationField.tsx';
import NewPasswordField from '@/Pages/user/account/Components/PasswordUpdate/NewPasswordField.tsx';
import ConfirmPasswordField from '@/Pages/user/account/Components/PasswordUpdate/ConfirmPasswordField.tsx';

interface FormData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export default function PasswordUpdateForm() {
    const [isPasswordVerified, setIsPasswordVerified] = useState(false);
    const formMethods = useForm<FormData>({
        mode: 'onBlur',
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    const completePasswordVerification = () => {
        setIsPasswordVerified(true);
    };

    const onSubmit: SubmitHandler<FormData> = async data => {
        if (!isPasswordVerified) {
            window.alert('비밀번호 인증을 완료해주세요.');
            return;
        }

        const newPassword = data.newPassword.replace(/\s/gi, '');
        console.log(newPassword);
    };

    return (
        <FormProvider {...formMethods}>
            <form className={'flex flex-col gap-y-8'} onSubmit={formMethods.handleSubmit(onSubmit)}>
                <div className={'flex w-full flex-col gap-y-4'}>
                    <PasswordVerificationField
                        isPasswordVerified={isPasswordVerified}
                        completePasswordVerification={completePasswordVerification}
                    />
                    <NewPasswordField isPasswordVerified={isPasswordVerified} />
                    <ConfirmPasswordField isPasswordVerified={isPasswordVerified} />
                </div>
                <div className={'flex w-full justify-end'}>
                    <button
                        className={
                            'rounded-xl border border-violet-600 bg-violet-600 px-5 py-2.5 text-[0.9rem] font-bold text-white transition-all enabled:hover:bg-violet-700 disabled:opacity-75'
                        }
                        type={'submit'}
                        disabled={!isPasswordVerified}
                    >
                        변경
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}

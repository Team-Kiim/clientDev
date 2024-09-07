import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import CurrentPasswordField from '@/Pages/user/account/Components/UpdatePassword/CurrentPasswordField.tsx';
import NewPasswordField from '@/Pages/user/account/Components/UpdatePassword/NewPasswordField.tsx';
import ConfirmPasswordField from '@/Pages/user/account/Components/UpdatePassword/ConfirmPasswordField.tsx';

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
        console.log(newPassword);
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

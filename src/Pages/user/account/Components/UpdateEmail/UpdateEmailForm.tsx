import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import NewEmailField from '@/Pages/user/account/Components/UpdateEmail/NewEmailField.tsx';
import VerificationCodeField from '@/Pages/user/account/Components/UpdateEmail/VerificationCodeField.tsx';

interface FormValues {
    newEmail: string;
    verificationCode: string;
}

export default function UpdateEmailForm() {
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    const [isRequestingVerification, setIsRequestingVerification] = useState(false);

    const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);

    const formMethods = useForm<FormValues>({
        mode: 'onBlur',
        defaultValues: {
            newEmail: '',
            verificationCode: '',
        },
    });

    const onSubmit: SubmitHandler<FormValues> = async data => {
        const newEmail = data.newEmail.replace(/\s/gi, '');
        console.log(newEmail);
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

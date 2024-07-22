import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import EmailInputWithVerificationButton from '@/Pages/user/account/Components/EmailUpdate/EmailInputWithVerificationButton.tsx';
import VerificationCodeInput from '@/Pages/user/account/Components/EmailUpdate/VerificationCodeInput.tsx';

interface FormData {
    email: string;
    verificationCode: string;
}

export default function EmailUpdateForm() {
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isVerificationRequested, setIsVerificationRequested] = useState(false);

    const formMethods = useForm<FormData>({
        mode: 'onBlur',
        defaultValues: {
            email: '',
            verificationCode: '',
        },
    });

    const onSubmit: SubmitHandler<FormData> = async data => {
        if (!isEmailVerified) {
            window.alert('이메일 인증을 완료해주세요.');
            return;
        }

        const email = data.email.replace(/\s/gi, '');
        console.log(email);
    };

    return (
        <FormProvider {...formMethods}>
            <form className={'flex flex-col gap-y-8'} onSubmit={formMethods.handleSubmit(onSubmit)}>
                <div className={'flex w-full flex-col gap-y-4'}>
                    <EmailInputWithVerificationButton
                        isVerificationRequested={isVerificationRequested}
                        setVerificationRequestedTrue={() => {
                            setIsVerificationRequested(true);
                        }}
                    />
                    <VerificationCodeInput
                        isVerificationRequested={isVerificationRequested}
                        isEmailVerified={isEmailVerified}
                        setEmailVerifiedTrue={() => {
                            setIsEmailVerified(true);
                        }}
                    />
                </div>
                <div className={'flex w-full justify-end'}>
                    <button
                        className={
                            'rounded-xl border border-violet-600 bg-violet-600 px-5 py-2.5 text-[0.9rem] font-bold text-white transition-all hover:bg-violet-700'
                        }
                        type={'submit'}
                    >
                        변경
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}

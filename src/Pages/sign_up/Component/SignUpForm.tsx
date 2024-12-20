import { useState } from 'react';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import EmailVerificationInputs from '@/Pages/sign_up/Component/EmailVerificationInputs.tsx';
import PasswordInputs from '@/Pages/sign_up/Component/PasswordInputs.tsx';
import NicknameInput from '@/Pages/sign_up/Component/NicknameInput.tsx';
import JobSelectInput from '@/Pages/sign_up/Component/JobSelectInput.tsx';
import useAuth from '@/Hooks/Auth/useAuth.tsx';

interface FormData {
    email: string;
    verificationCode: string;
    password: string;
    confirmPassword: string;
    nickname: string;
    job: string;
}

export default function SignUpForm() {
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    const { signUp } = useAuth();

    const formMethods = useForm<FormData>({
        mode: 'onBlur',
        defaultValues: {
            email: '',
            verificationCode: '',
            password: '',
            confirmPassword: '',
            nickname: '',
            job: '',
        },
    });

    const updateEmailVerification = () => {
        setIsEmailVerified(true);
    };

    const onSubmit: SubmitHandler<FormData> = async data => {
        if (!isEmailVerified) {
            window.alert('이메일 인증을 완료해주세요.');
            return;
        }
        const email = data.email.replace(/\s/gi, '');
        const password = data.password.replace(/\s/gi, '');
        const nickname = data.nickname.trim();
        const job = data.job;

        signUp({
            email,
            password,
            nickname,
            job,
        });
    };

    return (
        <FormProvider {...formMethods}>
            <form className={'flex w-full flex-col gap-y-10'} onSubmit={formMethods.handleSubmit(onSubmit)}>
                <div className={'flex w-full flex-col gap-y-7'}>
                    <EmailVerificationInputs updateEmailVerification={updateEmailVerification} />
                    <PasswordInputs />
                    <NicknameInput />
                    <JobSelectInput />
                </div>
                <button
                    className={
                        'flex w-full items-center justify-center rounded-2xl bg-plump-purple-600 py-3.5 text-[0.9rem] transition-all hover:bg-plump-purple-700 disabled:opacity-50'
                    }
                    type={'submit'}
                    disabled={formMethods.formState.isSubmitting}
                >
                    <span className={'font-bold text-white'}>회원가입</span>
                </button>
            </form>
        </FormProvider>
    );
}

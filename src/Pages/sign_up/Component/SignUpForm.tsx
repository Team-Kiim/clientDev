import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import EmailVerificationInputs from '@/Pages/sign_up/Component/EmailVerificationInputs.tsx';
import PasswordInputs from '@/Pages/sign_up/Component/PasswordInputs.tsx';
import NicknameInput from '@/Pages/sign_up/Component/NicknameInput.tsx';

interface FormData {
    email: string;
    password: string;
    nickname: string;
}

export default function SignUpForm() {
    const formMethods = useForm<FormData>({
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
            nickname: '',
        },
    });

    const onSubmit: SubmitHandler<FormData> = async data => {
        console.log(data.email.replace(/\s/gi, ''));
        console.log(data.nickname.replace(/\s/gi, ''));
        console.log(data.password.replace(/\s/gi, ''));
    };

    return (
        <FormProvider {...formMethods}>
            <form className={'flex w-full flex-col gap-y-8'} onSubmit={formMethods.handleSubmit(onSubmit)}>
                <div className={'flex w-full flex-col gap-y-7'}>
                    <EmailVerificationInputs />
                    <PasswordInputs />
                    <NicknameInput />
                </div>
                <button
                    className={
                        'flex w-full items-center justify-center rounded-lg bg-violet-600 py-3 transition-all hover:bg-violet-700 disabled:opacity-50'
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

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import EmailVerificationInputs from '@/Pages/sign_up/Component/EmailVerificationInputs.tsx';
import PasswordInputs from '@/Pages/sign_up/Component/PasswordInputs.tsx';
import NicknameInput from '@/Pages/sign_up/Component/NicknameInput.tsx';
import JobSelectInput from '@/Pages/sign_up/Component/JobSelectInput.tsx';

interface FormData {
    email: string;
    verificationCode: string;
    password: string;
    confirmPassword: string;
    nickname: string;
    job: string;
}

export default function SignUpForm() {
    const navigate = useNavigate();

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

    const onSubmit: SubmitHandler<FormData> = async data => {
        const email = data.email.replace(/\s/gi, '');
        const password = data.password.replace(/\s/gi, '');
        const nickname = data.nickname.trim();
        const job = data.job;

        try {
            const response = await axios.post('/api/auth/signup', {
                email,
                password,
                nickname,
                memberRole: job,
            });
            window.alert(response.data);
            navigate('/sign_in', { replace: true });
        } catch (error) {
            //TODO
            // 에러처리
        }
    };

    return (
        <FormProvider {...formMethods}>
            <form className={'flex w-full flex-col gap-y-8'} onSubmit={formMethods.handleSubmit(onSubmit)}>
                <div className={'flex w-full flex-col gap-y-7'}>
                    <EmailVerificationInputs />
                    <PasswordInputs />
                    <NicknameInput />
                    <JobSelectInput />
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

import { Link } from 'react-router-dom';
import SignInForm from '@/Pages/sign_in/Component/SignInForm.tsx';
import PasswordResetSection from '@/Pages/sign_in/Component/PasswordReset/PasswordResetSection.tsx';
import OAuthSection from '@/Components/Auth/OAuthSection/OAuthSection.tsx';

export default function Page() {
    return (
        <div className={'mx-auto my-24 flex w-[22rem] flex-col items-center'}>
            <div className={'mb-1.5 flex w-full flex-col items-center gap-y-6'}>
                <div className={'flex w-full flex-col items-center gap-y-10'}>
                    <Link
                        className={
                            'logo inline-block bg-gradient-to-br from-plump-purple-500 to-plump-purple-700 bg-clip-text text-4xl font-bold text-transparent'
                        }
                        to={'/'}
                    >
                        KoffeeChat
                    </Link>
                    <SignInForm />
                </div>
                <div className={'flex w-full flex-col justify-between gap-y-3 px-1'}>
                    <div className={'flex justify-end'}>
                        <PasswordResetSection />
                    </div>
                    <p className={'text-[0.8rem] text-slate-500'}>
                        아직 회원이 아니신가요? {''}
                        <Link
                            className={'font-bold text-plump-purple-600 hover:underline hover:underline-offset-4'}
                            to={'/sign_up'}
                        >
                            이메일로 가입하기
                        </Link>
                    </p>
                </div>
            </div>
            <div className={'divider py-5 text-[0.8rem] text-gray-600'}>소셜로 로그인</div>
            <OAuthSection />
        </div>
    );
}

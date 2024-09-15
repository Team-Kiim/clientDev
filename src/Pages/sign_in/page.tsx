import { Link } from 'react-router-dom';
import SignInForm from '@/Pages/sign_in/Component/SignInForm.tsx';
import PasswordResetSection from '@/Pages/sign_in/Component/PasswordReset/PasswordResetSection.tsx';
import OAuthSection from '@/Components/Auth/OAuthSection/OAuthSection.tsx';

export default function Page() {
    return (
        <div className={'mx-auto my-24 flex w-[22rem] flex-col items-center'}>
            <div className={'mb-1.5 flex w-full flex-col items-center gap-y-7'}>
                <div className={'flex w-full flex-col items-center gap-y-10'}>
                    <Link
                        className={
                            'logo inline-block bg-gradient-to-br from-violet-500 to-indigo-500 bg-clip-text text-4xl font-bold text-transparent'
                        }
                        to={'/'}
                    >
                        KoffeeChat
                    </Link>
                    <SignInForm />
                </div>
                <div className={'flex w-full justify-between px-1'}>
                    <PasswordResetSection />
                    <Link
                        className={'text-[0.8rem] font-bold text-violet-500 hover:underline hover:underline-offset-4'}
                        to={'/sign_up'}
                    >
                        회원가입
                    </Link>
                </div>
            </div>
            <div className={'divider py-5 text-[0.8rem] text-gray-600'}>소셜로 로그인</div>
            <OAuthSection />
        </div>
    );
}

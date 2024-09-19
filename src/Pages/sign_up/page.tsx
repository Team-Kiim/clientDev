import { Link } from 'react-router-dom';
import SignUpForm from '@/Pages/sign_up/Component/SignUpForm.tsx';
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
                    <SignUpForm />
                </div>
                <div className={'flex w-full flex-col px-1'}>
                    <p className={'text-[0.8rem] text-slate-500'}>
                        이미 회원이신가요? {''}
                        <Link
                            className={'font-bold text-plump-purple-600 hover:underline hover:underline-offset-4'}
                            to={'/sign_in'}
                        >
                            이메일로 로그인하기
                        </Link>
                    </p>
                </div>
            </div>
            <div className={'divider text-[0.8rem] text-gray-600'}>소셜로 회원가입</div>
            <OAuthSection />
        </div>
    );
}

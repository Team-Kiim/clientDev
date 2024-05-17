import { Link } from 'react-router-dom';
import SignUpForm from '@/Pages/sign_up/Component/SignUpForm.tsx';
import OAuthSection from '@/Components/Auth/OAuthSection/OAuthSection.tsx';

export default function Page() {
    return (
        <div className={'mx-auto my-16 flex w-[27rem] flex-col items-center p-5'}>
            <div className={'mb-1.5 flex w-full flex-col items-center gap-y-5'}>
                <div className={'flex w-full flex-col items-center gap-y-10'}>
                    <Link className={'logo text-4xl text-violet-700'} to={'/'}>
                        KoffeeChat
                    </Link>
                    <SignUpForm />
                </div>
                <div className={'flex w-full justify-end px-1'}>
                    <Link className={'text-[0.85rem] font-bold transition-all hover:text-violet-700'} to={'/sign_in'}>
                        로그인
                    </Link>
                </div>
            </div>
            <div className={'divider text-[0.8rem] text-gray-600'}>소셜로 회원가입</div>
            <OAuthSection />
        </div>
    );
}

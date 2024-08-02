import { Link } from 'react-router-dom';
import SignUpForm from '@/Pages/sign_up/Component/SignUpForm.tsx';
import OAuthSection from '@/Components/Auth/OAuthSection/OAuthSection.tsx';

export default function Page() {
    return (
        <div className={'mx-auto my-24 flex w-[22rem] flex-col items-center'}>
            <div className={'mb-1.5 flex w-full flex-col items-center gap-y-5'}>
                <div className={'flex w-full flex-col items-center gap-y-10'}>
                    <Link className={'logo text-4xl text-violet-700'} to={'/'}>
                        KoffeeChat
                    </Link>
                    <SignUpForm />
                </div>
            </div>
            <div className={'divider text-[0.8rem] text-gray-600'}>소셜로 회원가입</div>
            <OAuthSection />
        </div>
    );
}

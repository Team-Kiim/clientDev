import KakaoOAuthButton from '@/Components/Auth/OAuthSection/KakaoSection/KakaoOAuthButton.tsx';
import NaverOAuthButton from '@/Components/Auth/OAuthSection/NaverSection/NaverOAuthButton.tsx';
import GoogleOAuthButton from '@/Components/Auth/OAuthSection/GoogleSection/GoogleOAuthButton.tsx';

export default function OAuthSection() {
    return (
        <div className={'flex w-full items-center justify-center gap-x-9'}>
            <KakaoOAuthButton />
            <NaverOAuthButton />
            <GoogleOAuthButton />
        </div>
    );
}

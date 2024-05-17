import KakaoSection from '@/Components/Auth/OAuthSection/KakaoSection/KakaoSection.tsx';
import NaverSection from '@/Components/Auth/OAuthSection/NaverSection/NaverSection.tsx';
import GoogleSection from '@/Components/Auth/OAuthSection/GoogleSection.tsx';

export default function OAuthSection() {
    return (
        <div className={'flex w-full items-center justify-center gap-x-9'}>
            <KakaoSection />
            <NaverSection />
            <GoogleSection />
        </div>
    );
}

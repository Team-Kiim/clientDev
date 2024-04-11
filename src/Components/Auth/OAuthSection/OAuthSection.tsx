import KakaoSection from '@/Components/Auth/OAuthSection/KakaoSection.tsx';
import NaverSection from '@/Components/Auth/OAuthSection/NaverSection.tsx';
import GoogleSection from '@/Components/Auth/OAuthSection/GoogleSection.tsx';

export default function OAuthSection() {
    return (
        <div className={'flex w-full items-center justify-center gap-x-4'}>
            <KakaoSection />
            <NaverSection />
            <GoogleSection />
        </div>
    );
}

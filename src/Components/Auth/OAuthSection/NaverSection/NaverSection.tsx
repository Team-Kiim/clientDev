import { useEffect, useRef } from 'react';
import { SiNaver } from 'react-icons/si';

const initNaverLogin = () => {
    const { VITE_DEV_URL, VITE_NAVER_CLIENT_ID } = import.meta.env;
    const { naver } = window as any;

    const naverLogin = new naver.LoginWithNaverId({
        clientId: VITE_NAVER_CLIENT_ID,
        callbackUrl: `${VITE_DEV_URL}/oauth/naver`,
        isPopup: false,
        callbackHandle: true,

        // 이 부분 생략하면, div#naverIdLogin 요소에 자식 요소 안생김.
        // 즉, a 요소 안생긴다.
        loginButton: { color: 'green', type: 3, height: 50 },
    });

    naverLogin.init();
};

export default function NaverSection() {
    const naverIdLoginRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        initNaverLogin();
    }, []);

    return (
        <>
            <button
                className={
                    'flex size-11 items-center justify-center rounded-md bg-[#03C75A] p-0.5 text-white focus:outline-none'
                }
                onClick={() => {
                    // 아이디가 naverIdLogin 인 div 요소 안에 a 요소가 존재하므로, div#naverIdLogin 요소에 클릭 이벤트 핸들러를 등록하면 안되고,
                    // 자식 요소, 즉 a 요소에 클릭 이벤트 핸들러를 등록해야 한다.
                    (naverIdLoginRef.current.firstElementChild as HTMLAnchorElement).click();
                }}
            >
                <SiNaver />
            </button>
            <div className={'hidden'} id={'naverIdLogin'} ref={naverIdLoginRef} />
        </>
    );
}

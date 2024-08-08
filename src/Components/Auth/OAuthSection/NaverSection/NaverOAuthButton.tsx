import { useEffect, useRef } from 'react';

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

export default function NaverOAuthButton() {
    const naverIdLoginRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        initNaverLogin();
    }, []);

    return (
        <>
            <button
                className={'flex w-full items-center justify-between rounded-xl bg-[#03C75A] px-5 py-[13px] text-white'}
                onClick={() => {
                    // 아이디가 naverIdLogin 인 div 요소 안에 a 요소가 존재하므로, div#naverIdLogin 요소에 클릭 이벤트 핸들러를 등록하면 안되고,
                    // 자식 요소, 즉 a 요소에 클릭 이벤트 핸들러를 등록해야 한다.
                    (naverIdLoginRef.current.firstElementChild as HTMLAnchorElement).click();
                }}
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='800px'
                    height='800px'
                    viewBox='0 0 512 512'
                    version='1.1'
                    fill='#ffffff'
                    stroke='#ffffff'
                    className={'size-6'}
                >
                    <g id='SVGRepo_bgCarrier' stroke-width='0' />

                    <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round' />

                    <g id='SVGRepo_iconCarrier'>
                        <path
                            fill='#ffffff'
                            d='M9 32V480H181.366V255.862L331.358 480H504V32H331.358V255.862L181.366 32H9Z'
                        />
                    </g>
                </svg>
                <span className={'flex-1 text-center text-sm font-bold'}>네이버로 시작하기</span>{' '}
            </button>
            <div className={'hidden'} id={'naverIdLogin'} ref={naverIdLoginRef} />
        </>
    );
}

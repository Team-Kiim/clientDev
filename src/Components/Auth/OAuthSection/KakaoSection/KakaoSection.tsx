export default function KakaoSection() {
    const { VITE_DEV_URL, VITE_KAKAO_REST_API_KEY } = import.meta.env;

    const redirectURL = `${VITE_DEV_URL}/oauth/kakao`;
    const kakaoLoginURL = `https://kauth.kakao.com/oauth/authorize?client_id=${VITE_KAKAO_REST_API_KEY}&redirect_uri=${redirectURL}&response_type=code`;

    return (
        <button
            className={'flex size-11 items-center justify-center rounded-md bg-[#FEE500] p-0.5'}
            type={'button'}
            onClick={() => {
                window.location.href = kakaoLoginURL;
            }}
        >
            <svg width='18px' xmlns='http://www.w3.org/2000/svg' height='17' viewBox='0 0 18 17'>
                <g transform='translate(0.000000,17.000000) scale(0.100000,-0.100000)' stroke='none'>
                    <path
                        fill='#212529'
                        d='M38 154 c-15 -8 -30 -25 -34 -38 -6 -26 10 -66 27 -66 7 0 9 -10 5 -26 -7 -25 -6 -25 16 -10 12 9 31 16 41 16 29 0 75 28 82 50 10 31 -3 59 -35 75 -36 19 -67 18 -102 -1z'
                    />
                </g>
            </svg>
        </button>
    );
}

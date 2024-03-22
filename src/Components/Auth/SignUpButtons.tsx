import { FcGoogle } from 'react-icons/fc';
import { SiNaver } from 'react-icons/si';

export default function SignUpButtons() {
    return (
        <div className={'flex w-full flex-col gap-y-5'}>
            <button
                className={
                    'flex h-[48px] w-full items-center justify-center gap-x-2 rounded-lg bg-[#03C75A] text-white'
                }
            >
                <SiNaver />
                <span>네이버 계정으로 가입</span>
            </button>
            <button className={'flex h-[48px] w-full items-center justify-center gap-x-2 rounded-lg bg-[#FEE500]'}>
                <svg width='18px' xmlns='http://www.w3.org/2000/svg' height='17' viewBox='0 0 18 17'>
                    <g transform='translate(0.000000,17.000000) scale(0.100000,-0.100000)' stroke='none'>
                        <path
                            fill='#212529'
                            d='M38 154 c-15 -8 -30 -25 -34 -38 -6 -26 10 -66 27 -66 7 0 9 -10 5 -26 -7 -25 -6 -25 16 -10 12 9 31 16 41 16 29 0 75 28 82 50 10 31 -3 59 -35 75 -36 19 -67 18 -102 -1z'
                        />
                    </g>
                </svg>
                <span className={'text-black/.85'}>카카오 계정으로 가입</span>
            </button>
            <button
                className={
                    'flex h-[48px] w-full items-center justify-center gap-x-2 rounded-lg border border-gray-300 bg-white'
                }
            >
                <FcGoogle className={'size-5'} />
                <span>구글 계정으로 가입</span>
            </button>
        </div>
    );
}

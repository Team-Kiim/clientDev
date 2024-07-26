import { Link } from 'react-router-dom';
import { HiOutlineLockClosed } from 'react-icons/hi2';

export default function UnauthorizedErrorPage() {
    return (
        <div className={'my-20 flex flex-col items-center gap-y-8'}>
            <div className={'flex items-center justify-center rounded-full bg-red-50 p-1.5 shadow-xl shadow-red-200'}>
                <HiOutlineLockClosed className={'size-10 text-red-500'} />
            </div>
            <h1 className={'text-[1.35rem] font-extrabold text-red-500'}>401 Unauthorized</h1>
            <div className={'flex flex-col items-center gap-y-6'}>
                <p className={'text-center text-[0.95rem] font-bold leading-7 text-slate-500'}>
                    로그인 후 볼 수 있는 컨텐츠입니다. 로그인 후 다시 시도해 주세요.
                </p>
                <div className={'flex items-center gap-x-5'}>
                    <Link
                        to={'/'}
                        className={
                            'rounded-xl bg-slate-100 px-4 py-2 text-[0.95rem] font-bold transition-all hover:bg-slate-200'
                        }
                    >
                        메인 페이지
                    </Link>
                    <Link
                        to={'/sign_in'}
                        className={
                            'rounded-xl bg-slate-100 px-4 py-2 text-[0.95rem] font-bold transition-all hover:bg-slate-200'
                        }
                    >
                        로그인
                    </Link>
                </div>
            </div>
        </div>
    );
}

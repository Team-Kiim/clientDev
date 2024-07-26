import { Link } from 'react-router-dom';
import { RiUserForbidLine } from 'react-icons/ri';

export default function ForbiddenErrorPage() {
    return (
        <div className={'my-20 flex flex-col items-center gap-y-8'}>
            <div className={'flex items-center justify-center rounded-full bg-red-50 p-1.5 shadow-xl shadow-red-200'}>
                <RiUserForbidLine className={'size-10 text-red-500'} />
            </div>
            <h1 className={'text-[1.35rem] font-extrabold text-red-500'}>403 Forbidden</h1>
            <div className={'flex flex-col items-center gap-y-6'}>
                <p className={'text-center text-[0.95rem] font-bold leading-7 text-slate-500'}>
                    접근이 거부되었습니다. 해당 페이지를 보기 위한 권한이 없습니다.
                </p>
                <Link
                    to={'/'}
                    className={
                        'rounded-xl bg-slate-100 px-4 py-2 text-[0.95rem] font-extrabold transition-all hover:bg-slate-200'
                    }
                >
                    메인 페이지
                </Link>
            </div>
        </div>
    );
}

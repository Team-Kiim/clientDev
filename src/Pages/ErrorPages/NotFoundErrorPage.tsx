import { Link } from 'react-router-dom';
import { LuSearchX } from 'react-icons/lu';

export default function NotFoundErrorPage() {
    return (
        <div className={'my-20 flex flex-col items-center gap-y-8'}>
            <div className={'flex items-center justify-center rounded-full bg-red-50 p-1.5 shadow-xl shadow-red-200'}>
                <LuSearchX className={'size-10 text-red-500'} />
            </div>
            <h1 className={'text-[1.35rem] font-extrabold text-red-500'}>404 Not Found</h1>
            <div className={'flex flex-col items-center gap-y-6'}>
                <p className={'text-center text-[0.95rem] font-bold leading-7 text-slate-500'}>
                    해당 페이지를 찾을 수 없습니다.
                    <br />
                    요청하신 페이지의 주소가 변경되었거나, 삭제되었습니다. 올바른 주소를 입력해 주세요.
                </p>
                <Link
                    to={'/'}
                    className={
                        'rounded-xl bg-slate-100 px-4 py-2 text-[0.95rem] font-bold transition-all hover:bg-slate-200'
                    }
                >
                    메인 페이지
                </Link>
            </div>
        </div>
    );
}

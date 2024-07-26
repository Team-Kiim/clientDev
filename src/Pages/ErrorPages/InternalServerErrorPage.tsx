import { Link } from 'react-router-dom';
import { LuServerCrash } from 'react-icons/lu';

interface Props {
    retry(...args: any[]): any;
}

export default function InternalServerErrorPage({ retry }: Props) {
    return (
        <div className={'my-20 flex flex-col items-center gap-y-8'}>
            <div className={'flex items-center justify-center rounded-full bg-red-50 p-1.5 shadow-xl shadow-red-200'}>
                <LuServerCrash className={'size-10 text-red-500'} />
            </div>
            <h1 className={'text-[1.35rem] font-extrabold text-red-500'}>500 Internal Server Error</h1>
            <div className={'flex flex-col items-center gap-y-6'}>
                <p className={'text-center text-[0.95rem] font-bold leading-7 text-slate-500'}>
                    요청사항을 처리하는 데 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
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
                    <button
                        className={
                            'rounded-xl bg-slate-100 px-4 py-2 text-[0.95rem] font-bold transition-all hover:bg-slate-200'
                        }
                        type={'button'}
                        onClick={() => {
                            retry();
                        }}
                    >
                        다시 시도
                    </button>
                </div>
            </div>
        </div>
    );
}

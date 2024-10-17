import { Link } from 'react-router-dom';

interface Props {
    retry(...args: any[]): any;
}

export default function InternalServerErrorPage({ retry }: Props) {
    return (
        <div className={'my-24 flex flex-col items-center gap-y-6'}>
            <div className={'rounded-3xl bg-plump-purple-50 px-4 py-1'}>
                <span className={'text-[2.3rem] font-[900] text-plump-purple-600'}>500</span>
            </div>
            <div className={'flex flex-col items-center gap-y-10'}>
                <div className={'flex flex-col items-center gap-y-3'}>
                    <h1 className={'text-xl font-extrabold text-slate-800'}>😢 내부 서버에 오류가 발생했습니다.</h1>
                    <p className={'text-center text-[0.9rem] font-bold text-slate-500'}>
                        요청사항을 처리하는 데 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
                    </p>
                </div>
                <div className={'flex gap-x-3'}>
                    <Link
                        to={'/'}
                        className={
                            'rounded-xl bg-slate-100 px-4 py-3 text-[0.9rem] font-bold transition-all hover:bg-slate-200'
                        }
                    >
                        메인 페이지
                    </Link>
                    <button
                        className={
                            'rounded-xl bg-plump-purple-600 px-4 py-3 text-[0.9rem] font-bold text-white transition-all hover:bg-plump-purple-700'
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

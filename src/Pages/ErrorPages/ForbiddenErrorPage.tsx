import { Link } from 'react-router-dom';

export default function ForbiddenErrorPage() {
    return (
        <div className={'my-24 flex flex-col items-center gap-y-6'}>
            <div className={'rounded-3xl bg-plump-purple-50 px-4 py-1'}>
                <span className={'text-[2.3rem] font-[900] text-plump-purple-600'}>403</span>
            </div>
            <div className={'flex flex-col items-center gap-y-10'}>
                <div className={'flex flex-col items-center gap-y-3'}>
                    <h1 className={'text-xl font-extrabold text-slate-800'}>🤐 접근이 거부되었습니다.</h1>
                    <p className={'text-center text-[0.9rem] font-bold text-slate-500'}>
                        요청하신 페이지 접근이 거부되었습니다. 해당 페이지를 보기 위한 권한이 없습니다.
                    </p>
                </div>
                <div>
                    <Link
                        to={'/'}
                        className={
                            'rounded-xl bg-slate-100 px-4 py-3 text-[0.9rem] font-bold transition-all hover:bg-slate-200'
                        }
                    >
                        메인 페이지
                    </Link>
                </div>
            </div>
        </div>
    );
}

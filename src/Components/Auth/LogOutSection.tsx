import { Link } from 'react-router-dom';

export default function LogOutSection() {
    return (
        <>
            <div className={'flex gap-x-4 justify-self-end'}>
                <Link
                    className={
                        'flex items-center justify-center rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-bold transition-all hover:bg-slate-200'
                    }
                    to={'/sign_in'}
                >
                    로그인
                </Link>
                <Link
                    className={
                        'flex items-center justify-center rounded-lg bg-plump-purple-600 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-plump-purple-700'
                    }
                    to={'/sign_up'}
                >
                    회원가입
                </Link>
            </div>
        </>
    );
}

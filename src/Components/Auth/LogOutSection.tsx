import { Link } from 'react-router-dom';

export default function LogOutSection() {
    return (
        <>
            <div className={'flex gap-x-6 justify-self-end'}>
                <Link className={'font-bold transition-all hover:text-violet-700'} to={'/sign_in'}>
                    로그인
                </Link>
                <Link className={'font-bold transition-all hover:text-violet-700'} to={'/sign_up'}>
                    회원가입
                </Link>
            </div>
        </>
    );
}

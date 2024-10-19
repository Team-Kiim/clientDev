import { Link } from 'react-router-dom';
import { HiOutlineArrowRightStartOnRectangle, HiOutlineUserCircle } from 'react-icons/hi2';
import useAuth from '@/Hooks/Auth/useAuth.tsx';

export default function UserMenuDropdown() {
    const { signOut } = useAuth();

    const handleSignOutButtonClick = () => {
        signOut();
    };

    return (
        <ul
            className={
                'absolute right-10 top-12 z-30 flex w-36 flex-col gap-y-1.5 rounded-xl border border-slate-200 bg-white p-3 text-[0.8rem] font-bold text-slate-700 shadow-lg'
            }
        >
            <Link
                className={
                    'flex w-full items-center gap-x-1.5 rounded-lg p-2 transition-all hover:bg-plump-purple-50 hover:text-plump-purple-600'
                }
                to={'/user'}
            >
                <HiOutlineUserCircle className={'size-5'} />
                마이 페이지
            </Link>
            <button
                className={
                    'flex w-full items-center gap-x-1.5 rounded-lg px-2 py-1.5 transition-all hover:bg-rose-50 hover:text-rose-500'
                }
                type={'button'}
                onClick={handleSignOutButtonClick}
            >
                <HiOutlineArrowRightStartOnRectangle className={'size-5'} />
                로그아웃
            </button>
        </ul>
    );
}

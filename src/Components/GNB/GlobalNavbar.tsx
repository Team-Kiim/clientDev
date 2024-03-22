import { useState } from 'react';
import { Link } from 'react-router-dom';
import PostSearch from '@/Components/PostSearch/PostSearch.tsx';
import AuthModal from '@/Components/Auth/AuthModal.tsx';

export default function GlobalNavbar() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const isLoggedIn = false;

    return (
        <nav
            className={
                'fixed flex h-[5rem] w-full  items-center justify-between border-b border-gray-300 bg-white px-20 py-2'
            }
        >
            <div className={'flex h-full items-center gap-x-9'}>
                <Link className={'text-3xl font-bold text-violet-600 '} to={'/'} replace>
                    KoffeeChat
                </Link>
                <div className={'flex items-center justify-center gap-x-6'}>
                    <Link
                        to={'/notice'}
                        className={'text-[1.05rem] font-medium text-gray-500 transition-all hover:text-gray-700'}
                    >
                        공지사항
                    </Link>
                    <Link
                        to={'/community'}
                        className={'text-[1.05rem] font-medium text-gray-500 transition-all hover:text-gray-700'}
                    >
                        커뮤니티
                    </Link>
                </div>
                <PostSearch />
            </div>
            <div className={'justify-self-end'}>
                <button
                    className={
                        'rounded-lg bg-violet-600 px-4 py-2.5 font-semibold text-white transition-all hover:bg-violet-700'
                    }
                    onClick={() => {
                        setIsAuthModalOpen(true);
                    }}
                >
                    로그인
                </button>
            </div>
            <AuthModal
                isAuthModalOpen={isAuthModalOpen}
                closeModal={() => {
                    setIsAuthModalOpen(false);
                }}
            />
        </nav>
    );
}

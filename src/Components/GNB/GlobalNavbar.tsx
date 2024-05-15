import { Link } from 'react-router-dom';
import PostSearch from '@/Components/PostSearch/PostSearch.tsx';
import LogOutSection from '@/Components/Auth/LogOutSection.tsx';
import LogInSection from '@/Components/Auth/LogInSection.tsx';

export default function GlobalNavbar() {
    const isLoggedIn = false;

    return (
        <nav className={'flex w-full items-center justify-between'}>
            <div className={'flex h-full items-center gap-x-10'}>
                <Link className={'logo text-2xl text-violet-600 '} to={'/'} replace>
                    KoffeeChat
                </Link>
                <div className={'flex items-center justify-center gap-x-6'}>
                    <Link to={'/notice'} className={'font-bold hover:text-violet-700'}>
                        공지사항
                    </Link>
                    <Link to={'/qnas'} className={'font-bold hover:text-violet-700'}>
                        {'Q&A'}
                    </Link>
                </div>
                <PostSearch />
            </div>
            {isLoggedIn ? <LogInSection /> : <LogOutSection />}
        </nav>
    );
}

import { Link } from 'react-router-dom';
import PostSearch from '@/Components/PostSearch/PostSearch.tsx';
import LogOutSection from '@/Components/Auth/LogOutSection.tsx';
import LogInSection from '@/Components/Auth/LogInSection.tsx';
import useLoggedInUserData from '@/Hooks/useLoggedInUserData.ts';

export default function GlobalNavbar() {
    const loggedInUserData = useLoggedInUserData();

    return (
        <nav className={'flex w-full items-center justify-between'}>
            <div className={'flex h-full items-center gap-x-8'}>
                <Link className={'logo text-2xl text-violet-600 '} to={'/'} replace>
                    KoffeeChat
                </Link>
                <div className={'flex items-center justify-center gap-x-2'}>
                    <Link
                        to={'/qnas'}
                        className={'rounded-md px-2 py-1 text-[0.93rem] font-bold transition-all hover:bg-slate-100'}
                    >
                        {'Q&A'}
                    </Link>
                    <Link
                        to={'/community'}
                        className={'rounded-md px-2 py-1 text-[0.93rem] font-bold transition-all hover:bg-slate-100'}
                    >
                        커뮤니티
                    </Link>
                </div>
                <PostSearch />
            </div>
            {!!loggedInUserData ? <LogInSection /> : <LogOutSection />}
        </nav>
    );
}

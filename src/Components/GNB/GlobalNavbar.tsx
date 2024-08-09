import { Link } from 'react-router-dom';
import PostSearchInput from '@/Components/PostSearch/PostSearchInput.tsx';
import LogOutSection from '@/Components/Auth/LogOutSection.tsx';
import LogInSection from '@/Components/Auth/LogInSection.tsx';
import useLoggedInUserData from '@/Hooks/useLoggedInUserData.ts';

export default function GlobalNavbar() {
    const loggedInUserData = useLoggedInUserData();

    return (
        <nav className={'flex w-full items-center justify-between'}>
            <div className={'flex h-full items-center gap-x-8'}>
                <Link className={'logo text-2xl text-violet-600 '} to={'/'}>
                    KoffeeChat
                </Link>
                <div className={'flex items-center justify-center gap-x-2'}>
                    <Link
                        to={'/qnas'}
                        className={'rounded-lg px-2 py-2.5 text-[0.93rem] font-bold transition-all hover:bg-slate-100'}
                    >
                        {'Q&A'}
                    </Link>
                    <Link
                        to={'/community'}
                        className={'rounded-lg px-2 py-2.5 text-[0.93rem] font-bold transition-all hover:bg-slate-100'}
                    >
                        커뮤니티
                    </Link>
                </div>
                <PostSearchInput />
            </div>
            {!!loggedInUserData ? <LogInSection /> : <LogOutSection />}
        </nav>
    );
}

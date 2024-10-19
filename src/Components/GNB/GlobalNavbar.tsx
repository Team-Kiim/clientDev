import { Link, NavLink } from 'react-router-dom';
import SearchPostInput from '@/Components/PostSearch/SearchPostInput.tsx';
import LogOutSection from '@/Components/Auth/LogOutSection.tsx';
import LogInSection from '@/Components/GNB/LoginSection.tsx';
import useAuth from '@/Hooks/Auth/useAuth.tsx';

export default function GlobalNavbar() {
    const { user } = useAuth();

    return (
        <nav className={'flex w-full items-center justify-between'}>
            <div className={'flex h-full items-center gap-x-8'}>
                <Link
                    className={
                        'logo inline-block bg-gradient-to-br from-plump-purple-500 to-plump-purple-700 bg-clip-text text-2xl font-bold text-transparent'
                    }
                    to={'/'}
                >
                    KoffeeChat
                </Link>
                <div className={'flex items-center justify-center gap-x-2'}>
                    <NavLink
                        to={'/qnas'}
                        className={({ isActive }) => {
                            return `rounded-lg px-2 py-2.5 text-[0.93rem] font-bold transition-all ${isActive ? 'bg-plump-purple-50 text-plump-purple-600' : 'text-slate-800 hover:bg-slate-100'}  `;
                        }}
                    >
                        {'Q&A'}
                    </NavLink>
                    <NavLink
                        to={'/community'}
                        className={({ isActive }) => {
                            return `rounded-lg px-2 py-2.5 text-[0.93rem] font-bold transition-all ${isActive ? 'bg-plump-purple-50 text-plump-purple-600' : 'text-slate-800 hover:bg-slate-100'}  `;
                        }}
                    >
                        커뮤니티
                    </NavLink>
                </div>
                <SearchPostInput />
            </div>
            {user ? <LogInSection /> : <LogOutSection />}
        </nav>
    );
}

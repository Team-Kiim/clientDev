import { Outlet } from 'react-router-dom';
import GlobalNavbar from '@/Components/GNB/GlobalNavbar.tsx';

export default function Layout() {
    return (
        <div>
            <header
                className={
                    'fixed z-10 flex h-[5rem] w-full flex-col justify-center border-b border-gray-300 bg-white/50 backdrop-blur-md'
                }
            >
                <div className={'mx-64'}>
                    <GlobalNavbar />
                </div>
            </header>
            <div className={'mx-64 pt-28'}>
                <Outlet />
            </div>
        </div>
    );
}

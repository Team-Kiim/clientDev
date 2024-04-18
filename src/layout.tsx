import { Outlet, useLocation } from 'react-router-dom';
import GlobalNavbar from '@/Components/GNB/GlobalNavbar.tsx';

const shouldHideGNB = (pathname: string): boolean => {
    if (pathname.includes('/qnas/write') || pathname.includes('/qnas/edit')) {
        return true;
    } else {
        return false;
    }
};

export default function Layout() {
    const { pathname } = useLocation();

    return (
        <div>
            {!shouldHideGNB(pathname) && (
                <header
                    className={
                        'fixed top-0 z-50 flex h-[5rem] w-full flex-col justify-center border-b border-gray-300 bg-white/50 backdrop-blur-md'
                    }
                >
                    <div className={'mx-40'}>
                        <GlobalNavbar />
                    </div>
                </header>
            )}
            <div>
                <Outlet />
            </div>
        </div>
    );
}

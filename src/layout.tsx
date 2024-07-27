import { Outlet, useLocation } from 'react-router-dom';
import GlobalNavbar from '@/Components/GNB/GlobalNavbar.tsx';
import MyChatButton from '@/Components/MyChat/MyChatButton.tsx';
import useLoggedInStatus from '@/Hooks/useLoggedInStatus.ts';
import AppErrorBoundary from '@/Components/Error/AppErrorBoundary.tsx';

const shouldHideGNB = (pathname: string): boolean => {
    if (
        pathname.includes('/qnas/write') ||
        pathname.includes('/community/write') ||
        pathname.includes('/community/edit') ||
        pathname.includes('/qnas/edit') ||
        pathname.includes('/sign_in') ||
        pathname.includes('/sign_up')
    ) {
        return true;
    } else {
        return false;
    }
};

export default function Layout() {
    const { pathname } = useLocation();
    const isLoggedIn = useLoggedInStatus();

    return (
        <div>
            {!shouldHideGNB(pathname) && (
                <div
                    className={
                        'sticky top-0 z-50 flex h-[4.5rem] w-full min-w-[1500px] items-center justify-center border-b border-gray-200 bg-white'
                    }
                >
                    <div className={'w-[80rem]'}>
                        <GlobalNavbar />
                    </div>
                </div>
            )}
            <div>
                <AppErrorBoundary>
                    <Outlet />
                </AppErrorBoundary>
                {isLoggedIn && <MyChatButton />}
            </div>
        </div>
    );
}

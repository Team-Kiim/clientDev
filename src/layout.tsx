import { throttle } from 'lodash';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import GlobalNavbar from '@/Components/GNB/GlobalNavbar.tsx';
import MyChatSection from '@/Components/MyChat/MyChatSection.tsx';
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
    const { pathname, search } = useLocation();
    const isLoggedIn = useLoggedInStatus();

    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = throttle(() => {
        const scrollTop = window.scrollY;
        setIsScrolled(scrollTop > 0);
    }, 200);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (Swal.isVisible()) {
            Swal.close();
        }
    }, [pathname, search]);

    return (
        <div>
            {!shouldHideGNB(pathname) && (
                <div
                    className={`sticky top-0 z-50 flex h-[4.5rem] w-full min-w-[1500px] items-center justify-center ${isScrolled && 'border-b border-slate-200'} bg-white`}
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
            </div>
            {isLoggedIn && <MyChatSection />}
        </div>
    );
}

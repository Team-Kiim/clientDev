import { Outlet, useLocation } from 'react-router-dom';
import GlobalNavbar from '@/Components/GNB/GlobalNavbar.tsx';

const shouldHideGNB = (pathname: string): boolean => {
    if (
        pathname.includes('/qnas/write') ||
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

    return (
        <div className={'h-dvh overflow-auto'}>
            {!shouldHideGNB(pathname) && (
                <div
                    className={
                        'sticky top-0 z-50 flex h-[5rem] w-full min-w-[1500px] items-center justify-center border-b border-gray-300 bg-white'
                    }
                >
                    <div className={'w-[87.5rem]'}>
                        <GlobalNavbar />
                    </div>
                </div>
            )}
            <div>
                <Outlet />
            </div>
        </div>
    );
}

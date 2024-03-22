import { Outlet } from 'react-router-dom';
import GlobalNavbar from '@/Components/GNB/GlobalNavbar.tsx';

export default function Layout() {
    return (
        <div>
            <div>
                <GlobalNavbar />
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
}

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '@/Hooks/Auth/useAuth.tsx';

export default function PublicRoute() {
    const { pathname } = useLocation();

    const pathSegment = pathname.split('/')[1];

    const { user } = useAuth();

    if (pathSegment === 'sign_in' || pathSegment === 'sign_up') {
        if (user === undefined) {
            return null;
        }

        if (user) {
            return <Navigate to={'/'} replace />;
        }
    }

    return <Outlet />;
}

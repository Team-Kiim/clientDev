import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/Hooks/Auth/useAuth.tsx';

export default function PrivateRoute() {
    const { user } = useAuth();

    if (user === undefined) {
        return null;
    }

    return user !== null ? <Outlet /> : <Navigate to={'/sign_in'} replace />;
}

import useAuth from '@/Hooks/Auth/useAuth.tsx';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminPageNavbar from '@/Pages/admin/Components/AdminPageNavbar.tsx';

export default function AdminPageLayout() {
    const navigate = useNavigate();

    const { user } = useAuth();

    if (user === undefined) {
        return (
            <div className={'flex h-dvh w-dvw items-center justify-center'}>
                <div>
                    <span className={'loading loading-spinner w-12 text-plump-purple-600'} />
                </div>
            </div>
        );
    }

    if (user === null) {
        window.alert('현재 관리자 페이지에 들어갈 수 없습니다. 잠시 후 다시 시도해주세요.');
        navigate('/');
    }

    if (user.memberRole !== 'ADMIN') {
        window.alert('관리자만 접근 가능한 페이지입니다.');
        navigate('/', { replace: true });
    }

    return (
        <div>
            <AdminPageNavbar />
            <div>
                <Outlet />
            </div>
        </div>
    );
}

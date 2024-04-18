import { Navigate, useLocation } from 'react-router-dom';

export default function NaverRedirect() {
    const { hash } = useLocation();
    const accessToken = hash.slice(1).split('&')[0].split('=')[1];
    console.log(accessToken);

    return <Navigate to={'/'} replace={true} />;
}

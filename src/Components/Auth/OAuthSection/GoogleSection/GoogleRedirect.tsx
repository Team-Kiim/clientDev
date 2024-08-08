import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function GoogleRedirect() {
    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    const { VITE_DEV_URL, VITE_GOOGLE_CLIENT_SECRET, VITE_GOOGLE_CLIENT_ID } = import.meta.env;

    const { isSuccess, isError, isLoading } = useQuery({
        queryKey: ['oauth', 'google'],
        queryFn: () => {
            return axios.post('/api/oauth/get-google-code', {
                clientId: VITE_GOOGLE_CLIENT_ID,
                redirectUri: `${VITE_DEV_URL}/oauth/google`,
                code,
                clientSecret: VITE_GOOGLE_CLIENT_SECRET,
            });
            // 미완성
        },
        gcTime: 0,
    });

    if (isSuccess) {
        navigate('/', { replace: true });
        return;
    }

    if (isError) {
        window.alert('로그인에 실패하였습니다. 잠시 후 다시 시도해주세요.');
        navigate('/', { replace: true });
        return;
    }

    if (isLoading) {
        return <>로딩중...</>;
    }
}

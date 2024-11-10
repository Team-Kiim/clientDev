import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Navigate, useLocation } from 'react-router-dom';

export default function NaverRedirect() {
    const { hash } = useLocation();
    const queryClient = useQueryClient();
    const accessToken = hash.slice(1).split('&')[0].split('=')[1];

    const { isSuccess, isError } = useQuery({
        queryKey: ['oauth', 'naver'],
        queryFn: () => {
            return axios
                .post('/api/oauth/get-member-info', {
                    accessToken,
                    socialLoginType: 'NAVER',
                })
                .then(response => {
                    const email = response.data.response.email;
                    const nickname = response.data.response.nickname;

                    return axios
                        .post('/api/oauth/login', {
                            email,
                            nickname,
                        })
                        .then(() => {
                            return true;
                        });
                });
        },
        gcTime: 0,
    });

    if (isSuccess) {
        queryClient.invalidateQueries({
            queryKey: ['user', 'loggedIn'],
            refetchType: 'all',
        });
        return <Navigate to={'/'} replace={true} />;
    }

    if (isError) {
        window.alert('로그인에 실패하였습니다. 잠시 후 다시 시도해주세요.');
        return <Navigate to={'/'} replace={true} />;
    }

    return null;
}

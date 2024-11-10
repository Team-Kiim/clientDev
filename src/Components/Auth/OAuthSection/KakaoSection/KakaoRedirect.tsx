import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Navigate, useSearchParams } from 'react-router-dom';

export default function KakaoRedirect() {
    const queryClient = useQueryClient();

    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    const { VITE_DEV_URL, VITE_KAKAO_CLIENT_SECRET, VITE_KAKAO_REST_API_KEY } = import.meta.env;

    const { isSuccess, isError } = useQuery({
        queryKey: ['oauth', 'kakao'],
        queryFn: () => {
            return axios
                .post('/api/oauth/get-kakao-code', {
                    clientId: VITE_KAKAO_REST_API_KEY,
                    redirectUri: `${VITE_DEV_URL}/oauth/kakao`,
                    code: code,
                    clientSecret: VITE_KAKAO_CLIENT_SECRET,
                })
                .then(response => {
                    return response.data.access_token;
                })
                .then((accessToken: string) => {
                    return axios
                        .post(`/api/oauth/get-member-info`, {
                            accessToken,
                            socialLoginType: 'KAKAO',
                        })
                        .then(response => {
                            const kakaoAccount = response.data['kakao_account'];
                            const profile = response.data.properties;
                            const email = kakaoAccount.email;
                            const nickname = profile.nickname;
                            return axios
                                .post('/api/oauth/login', {
                                    email,
                                    nickname,
                                })
                                .then(response => {
                                    console.log(response);
                                    return true;
                                });
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

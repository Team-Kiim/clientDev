import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { HiOutlineCheckCircle } from 'react-icons/hi2';
import type { User } from '@/Types/User.ts';
import ALERT_STYLE from '@/Constants/alertStyle.ts';

const useAuth = () => {
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const { data: user } = useQuery<User>({
        queryKey: ['user', 'loggedIn'],
        queryFn: () => {
            return axios
                .get('/api/member/profile')
                .then(response => response.data)
                .catch(() => null);
        },
        gcTime: Infinity,
    });

    const { mutate: signIn } = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) => {
            return axios.post('/api/auth/login', {
                email,
                password,
            });
        },

        onSuccess: () => {
            navigate('/', { replace: true });
            queryClient.invalidateQueries({
                queryKey: ['user', 'loggedIn'],
                refetchType: 'all',
            });
        },

        onError: (error: AxiosError) => {
            console.error(error);
        },
    });

    const { mutate: signOut } = useMutation({
        mutationFn: () => {
            return axios.get('/api/auth/logout');
        },

        onSuccess: () => {
            queryClient.setQueryData(['user', 'loggedIn'], null);
            navigate('/', { replace: true });
        },

        onError: (error: AxiosError) => {
            console.error(error);
        },
    });

    const { mutate: signUp } = useMutation({
        mutationFn: ({
            email,
            password,
            nickname,
            job,
        }: {
            email: string;
            password: string;
            nickname: string;
            job: string;
        }) => {
            return axios.post('/api/auth/signup', {
                email,
                password,
                nickname,
                memberRole: job,
            });
        },

        onSuccess: () => {
            withReactContent(Swal)
                .fire({
                    html: <p className={'text-sm leading-relaxed text-slate-500'}>회원가입에 성공하였습니다.</p>,
                    title: (
                        <div className={'flex items-center gap-x-2'}>
                            <HiOutlineCheckCircle className={'size-6 text-green-500'} />
                            <h1 className={'font-bold'}>가입을 환영합니다!</h1>
                        </div>
                    ),
                    showCancelButton: true,
                    confirmButtonText: '로그인',
                    cancelButtonText: '취소',
                    customClass: ALERT_STYLE,
                })
                .then(result => {
                    if (result.isConfirmed) {
                        navigate('/sign_in', { replace: true });
                    } else if (result.dismiss) {
                        navigate('/', { replace: true });
                    }
                });
        },

        onError: (error: AxiosError) => {
            console.error(error);
        },
    });

    return {
        user,
        signIn,
        signOut,
        signUp,
    };
};

export default useAuth;

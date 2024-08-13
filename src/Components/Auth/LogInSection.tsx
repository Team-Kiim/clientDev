import axios, { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import NotificationSection from '@/Components/Notification/NotificationSection.tsx';
import type { User } from '@/Types/User.ts';

export default function LogInSection() {
    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const { VITE_SERVER_URL } = import.meta.env;
    const { profileImageName, profileImagePath } = queryClient.getQueryData<User>(['loggedIn user']);

    const handleLogoutButtonClick = async () => {
        try {
            await axios.get('/api/auth/logout');
            await queryClient.invalidateQueries({ queryKey: ['loggedIn user'] });
            await queryClient.invalidateQueries({ queryKey: ['loggedIn status'] });
            navigate('/');
        } catch (err) {
            const error = err as AxiosError;
            console.error(error);
        }
    };

    return (
        <div>
            <div className={'flex items-center gap-x-6 justify-self-end'}>
                <NotificationSection />
                <Link className={'rounded-full p-1 transition-all hover:bg-gray-100'} to={'/chat'}>
                    <ChatBubbleOvalLeftEllipsisIcon className={'size-7'} />
                </Link>
                <Link to={`/user`}>
                    <div className={'avatar flex items-center'}>
                        <div className={'size-7 rounded-full'}>
                            <img
                                src={`${VITE_SERVER_URL}/image/${profileImagePath}/${profileImageName}`}
                                alt={'example_profile_img'}
                            />
                        </div>
                    </div>
                </Link>
                <button
                    className={
                        'rounded-lg bg-slate-100 px-4 py-2.5 text-[0.9rem] font-bold transition-all hover:bg-slate-200'
                    }
                    type={'button'}
                    onClick={handleLogoutButtonClick}
                >
                    로그아웃
                </button>
            </div>
        </div>
    );
}

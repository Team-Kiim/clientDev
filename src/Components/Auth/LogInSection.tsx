import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { BellIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import type { User } from '@/Types/User.ts';

export default function LogInSection() {
    const queryClient = useQueryClient();

    const { VITE_SERVER_URL } = import.meta.env;
    const { profileImageName, profileImagePath } = queryClient.getQueryData<User>(['loggedIn user']);

    return (
        <div>
            <div className={'flex items-center gap-x-6 justify-self-end'}>
                <Link className={'rounded-full p-1 transition-all hover:bg-gray-100'} to={'/notification'}>
                    <BellIcon className={'size-7'} />
                </Link>
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
                >
                    로그아웃
                </button>
            </div>
        </div>
    );
}

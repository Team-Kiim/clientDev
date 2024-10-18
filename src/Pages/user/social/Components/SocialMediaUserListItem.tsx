import { Link } from 'react-router-dom';
import type { SocialMediaUser } from '@/Types/SocialMediaUser.ts';

interface Props {
    loginMember?: boolean;
    socialMediaUser: SocialMediaUser;
    onUnfollowButtonClick(memberId: number): void;
}

export default function SocialMediaUserListItem({ socialMediaUser, onUnfollowButtonClick }: Props) {
    const { email, nickname, profileImageUrl, memberId, followedByLoginMember } = socialMediaUser;

    const { VITE_SERVER_URL } = import.meta.env;

    return (
        <li className={'flex gap-x-4 border-b border-slate-200 px-3.5 py-5 last:border-none'}>
            <div className={'avatar size-8'}>
                <img
                    className={'size-8 rounded-full'}
                    src={`${VITE_SERVER_URL}/${profileImageUrl}`}
                    alt={`${nickname}'s profile image`}
                />
            </div>
            <div className={'flex min-w-0 flex-1 flex-col gap-y-1'}>
                <Link
                    to={`/user/${memberId}`}
                    className={'w-fit text-[0.95rem] font-bold underline underline-offset-4'}
                >
                    {nickname}
                </Link>
                <Link to={`mailto:${email}`} className={'w-fit text-[0.8rem] text-slate-500'}>
                    {email}
                </Link>
            </div>
            {onUnfollowButtonClick && followedByLoginMember && (
                <div className={'flex flex-col justify-center'}>
                    <button
                        className={
                            'rounded-3xl border-2 border-black px-2 py-1 text-[0.8rem] font-extrabold transition-all hover:bg-slate-100'
                        }
                        onClick={() => {
                            onUnfollowButtonClick(memberId);
                        }}
                        type={'button'}
                    >
                        언팔로우
                    </button>
                </div>
            )}
        </li>
    );
}

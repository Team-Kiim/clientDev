import { Link } from 'react-router-dom';
import type { SocialMediaUser } from '@/Types/SocialMediaUser.ts';

interface Props {
    socialMediaUser: SocialMediaUser;
    onUnfollowButtonClick(): void;
    onFollowingListItemClick(memberId: number): void;
}

export default function FollowingListItem({ socialMediaUser, onUnfollowButtonClick, onFollowingListItemClick }: Props) {
    const { email, nickname, profileImagePath, profileImageName, memberId } = socialMediaUser;

    const { VITE_SERVER_URL } = import.meta.env;

    return (
        <li
            className={'flex gap-x-4 border-b border-slate-200 p-3.5 last:border-none'}
            onClick={() => {
                onFollowingListItemClick(memberId);
            }}
        >
            <div>
                <div className={'avatar size-8'}>
                    <img
                        className={'size-7 rounded-full'}
                        src={`${VITE_SERVER_URL}/image/${profileImagePath}/${profileImageName}`}
                        alt={'profile'}
                    />
                </div>
            </div>
            <div className={'flex flex-1 flex-col gap-y-1'}>
                <Link to={'/user/10'} className={'w-fit text-[0.95rem] font-bold underline underline-offset-4'}>
                    <span>{nickname}</span>
                </Link>
                <Link to={`mailto:kkangasdf12@naver.com`} className={'w-fit text-[0.8rem] text-slate-500'}>
                    {email}
                </Link>
            </div>
            <div className={'flex flex-col justify-center'}>
                <button
                    className={
                        'rounded-3xl border-2 border-black px-2 py-1 text-[0.8rem] font-extrabold transition-all hover:bg-slate-100'
                    }
                    onClick={onUnfollowButtonClick}
                    type={'button'}
                >
                    언팔로우
                </button>
            </div>
        </li>
    );
}

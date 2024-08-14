import { Link } from 'react-router-dom';
import type { SocialMediaUser } from '@/Types/SocialMediaUser.ts';

interface Props {
    socialMediaUser: SocialMediaUser;
    onFollowerListItemClick(memberId: number): void;
}

export default function FollowerListItem({ socialMediaUser, onFollowerListItemClick }: Props) {
    const { email, nickname, profileImagePath, profileImageName, memberId } = socialMediaUser;

    const { VITE_SERVER_URL } = import.meta.env;

    return (
        <li
            className={'flex cursor-pointer gap-x-4 border-b border-slate-200 p-3.5 last:border-none'}
            onClick={() => {
                onFollowerListItemClick(memberId);
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
                <Link to={'/user/20'} className={'w-fit text-[0.95rem] font-bold underline underline-offset-4'}>
                    <span>{nickname}</span>
                </Link>
                <Link to={`mailto:kkangasdf12@naver.com`} className={'w-fit text-[0.8rem] text-slate-500'}>
                    {email}
                </Link>
            </div>
        </li>
    );
}

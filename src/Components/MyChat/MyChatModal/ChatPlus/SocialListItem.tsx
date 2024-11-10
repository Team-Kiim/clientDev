interface SocialInfo {
    memberId: string;
    email: string;
    nickname: string;
    profileImageUrl: string;
    loginMember: boolean;
    followedByLoginMember: boolean;
}

interface Props {
    socialInfo: SocialInfo;
    onChatButtonClick(memberId: string, otherUserNickname: string): void;
}

export default function SocialListItem({ socialInfo, onChatButtonClick }: Props) {
    const { email, profileImageUrl, memberId, nickname } = socialInfo;

    return (
        <li className={'flex gap-x-4 border-b border-slate-200 px-4 py-3'}>
            <div className={'avatar size-10 rounded-full'}>
                <img className={'size-10 rounded-full'} src={profileImageUrl} alt={'profileImg'} />
            </div>
            <div className={'flex flex-1 flex-col'}>
                <span className={'line-clamp-1 text-[0.9rem] font-extrabold'}>{nickname}</span>
                <span className={'text-[0.75rem] text-slate-500'}>{email}</span>
            </div>
            <div className={'flex flex-col justify-center'}>
                <button
                    className={
                        'rounded-3xl border-2 border-neutral-800 px-2 py-1 text-[0.7rem] font-extrabold transition-all hover:bg-slate-100'
                    }
                    onClick={() => {
                        onChatButtonClick(memberId, nickname);
                    }}
                    type={'button'}
                >
                    채팅
                </button>
            </div>
        </li>
    );
}

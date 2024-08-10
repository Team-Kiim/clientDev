import { faker } from '@faker-js/faker';

interface Props {
    onChatButtonClick(): void;
}

export default function SocialListItem({ onChatButtonClick }: Props) {
    return (
        <li className={'flex gap-x-4 border-b border-slate-200 px-4 py-3'}>
            <div className={'avatar size-10 rounded-full'}>
                <img className={'size-10 rounded-full'} src={faker.image.avatarGitHub()} alt={'profileImg'} />
            </div>
            <div className={'flex flex-1 flex-col'}>
                <span className={'line-clamp-1 text-[0.9rem] font-extrabold'}>asdf1202</span>
                <span className={'text-[0.75rem] text-slate-500'}>kkangasdf12@naver.com</span>
            </div>
            <div className={'flex flex-col justify-center'}>
                <button
                    className={
                        'rounded-3xl border-2 border-neutral-800 px-2 py-1 text-[0.7rem] font-extrabold transition-all hover:bg-slate-100'
                    }
                    onClick={onChatButtonClick}
                    type={'button'}
                >
                    채팅
                </button>
            </div>
        </li>
    );
}

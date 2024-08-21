import { faker } from '@faker-js/faker';

interface Props {
    memberSent?: boolean;
    messageType: string;
}

export default function ChatBubbleListItem({ memberSent, messageType }: Props) {
    if (messageType === 'EXIT' || messageType === 'ENTER') {
        return (
            <li
                className={
                    'mx-auto w-2/5 list-none rounded-3xl border border-slate-200 bg-white px-4 py-0.5 text-center text-[0.75rem] text-neutral-800'
                }
            >
                <span className={'font-bold'}>kkangasdf12</span>님이{' '}
                {messageType === 'EXIT' ? '나갔습니다.' : '들어왔습니다.'}
            </li>
        );
    }

    return (
        <li className={`chat ${memberSent ? 'chat-start' : 'chat-end'} `}>
            <div className={'avatar chat-image'}>
                <div className={'size-9 rounded-full'}>
                    <img src={faker.image.avatarGitHub()} alt={'testImage'} />
                </div>
            </div>
            <div className={'chat-header mb-1 flex items-center text-[0.75rem]'}>
                <span className={'mx-2 font-bold'}>kkangasdf12</span>
            </div>
            <div
                className={`chat-bubble flex max-w-[240px] flex-col justify-center ${!memberSent ? 'bg-slate-200' : 'text-white'} text-[0.8rem] text-black`}
            >
                안녕하세요. 테스트입니다. 안녕하세요. 테스트입니다.
            </div>
            <div className={'chat-footer'}>
                <time className={'text-[0.65rem] opacity-80'}>
                    {2024}년 {12}월 {2}일 · 오후 {12}:{45}
                </time>
            </div>
        </li>
    );
}

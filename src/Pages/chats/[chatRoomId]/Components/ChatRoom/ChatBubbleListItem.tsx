import dayjs from 'dayjs';
import type { Chat } from '@/Types/chat.ts';
import 'dayjs/locale/ko.js';

dayjs.locale('ko');

interface Props {
    chatData: Chat;
    memberId?: string;
}

export default function ChatBubbleListItem({ chatData, memberId }: Props) {
    const { messageType, content, senderId, senderNickname, createdTime, profileImageUrl } = chatData;

    const isLoginMember = memberId === senderId;

    if (messageType === 'EXIT' || messageType === 'ENTER') {
        return (
            <li
                className={
                    'mx-auto w-2/5 list-none rounded-3xl border border-slate-200 bg-white px-4 py-0.5 text-center text-[0.75rem] text-neutral-800'
                }
            >
                <span className={'font-bold'}>{senderNickname}</span>님이{' '}
                {messageType === 'EXIT' ? '나갔습니다.' : '입장했습니다.'}
            </li>
        );
    }

    return (
        <li className={`chat ${isLoginMember ? 'chat-end' : 'chat-start'} space-y-1`}>
            <div className={'avatar chat-image'}>
                <div className={'size-9 rounded-full'}>
                    <img
                        src={profileImageUrl.includes('https') ? profileImageUrl : `https://${profileImageUrl}`}
                        alt={`${senderNickname}'s profile image`}
                    />
                </div>
            </div>
            <div className={'chat-header mb-1 flex items-center text-[0.75rem]'}>
                <span className={'mx-2 font-bold'}>{!isLoginMember && senderNickname}</span>
            </div>
            <div
                className={`chat-bubble flex max-w-[240px] flex-col justify-center whitespace-pre-wrap ${isLoginMember ? 'bg-slate-100 text-black' : 'text-white'} text-[0.8rem]`}
            >
                {content}
            </div>
            <div className={'chat-footer'}>
                <time className={'text-[0.65rem] opacity-80'}>
                    {dayjs(
                        typeof createdTime === 'string'
                            ? createdTime
                            : `${createdTime[0]}-${createdTime[1]}-${createdTime[2]} ${createdTime[3]}:${createdTime[4]}`,
                    ).format('YYYY년 MM월 DD일 A HH:mm')}
                </time>
            </div>
        </li>
    );
}

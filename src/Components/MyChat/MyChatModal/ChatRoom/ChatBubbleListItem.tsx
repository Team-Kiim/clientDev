import { Link } from 'react-router-dom';
import type { Chat } from '@/Types/chat.ts';
import dayjs from 'dayjs';
import 'dayjs/locale/ko.js';

interface Props {
    chatData: Chat;
    memberId?: string;
    oppositeMemberId?: string;
}

export default function ChatBubbleListItem({ chatData, memberId, oppositeMemberId }: Props) {
    const { messageType, content, senderId, senderNickname, createdTime, profileImageUrl } = chatData;

    const isLoginMember = memberId ? memberId === senderId : oppositeMemberId !== senderId;

    if (messageType === 'EXIT' || messageType === 'ENTER') {
        return (
            <li
                className={
                    'mx-auto w-fit list-none rounded-3xl border border-slate-300 bg-white px-4 py-0.5 text-center text-[0.75rem] text-black'
                }
            >
                {senderNickname} 님이 {messageType === 'EXIT' ? '나갔습니다.' : '입장했습니다.'}
            </li>
        );
    }

    return (
        <li className={`chat ${isLoginMember ? 'chat-end' : 'chat-start'} space-y-1`}>
            <div className={'avatar chat-image'}>
                <div className={'size-9 rounded-full'}>
                    <Link to={`/user/${senderId}`}>
                        <img src={profileImageUrl} alt={`${senderNickname}'s profile image`} />
                    </Link>
                </div>
            </div>
            <div className={'chat-header flex items-center text-[0.75rem]'}>
                <span className={'mx-2 font-bold'}>{!isLoginMember && senderNickname}</span>
            </div>
            <div
                className={`chat-bubble flex max-w-[200px] flex-col justify-center whitespace-pre-wrap ${!isLoginMember ? 'bg-slate-100 text-black' : 'text-white'} text-[0.78rem]`}
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

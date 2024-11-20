import dayjs from 'dayjs';
import 'dayjs/locale/ko.js';
import { Link } from 'react-router-dom';
import type { Chat } from '@/Types/chat.ts';

dayjs.locale('ko');

interface Props {
    chatData: Chat;
    memberId?: string;
    oppositeMemberId?: string;
    onImageClick(imageSrcList: string[]): void;
}

export default function ImageChatBubbleListItem({ chatData, memberId, oppositeMemberId, onImageClick }: Props) {
    const { senderNickname, senderId, createdTime } = chatData;

    const isLoginMember = memberId ? memberId === senderId : oppositeMemberId !== senderId;

    const imageSrc = chatData.content;

    return (
        <li className={`chat ${isLoginMember ? 'chat-end' : 'chat-start'} space-y-1 [&_img]:cursor-pointer`}>
            <div className={'avatar chat-image'}>
                <div className={'size-9 rounded-full'}>
                    <Link to={`/user/${senderId}`}>
                        <img src={chatData.profileImageUrl} alt={`profile image`} />
                    </Link>
                </div>
            </div>
            <div className={'chat-header flex items-center text-[0.75rem]'}>
                <span className={'mx-2 font-bold'}>{!isLoginMember && senderNickname}</span>
            </div>
            <div className={'flex max-w-[280px] flex-col justify-center whitespace-pre-wrap'}>
                <img
                    className={'rounded-xl'}
                    src={imageSrc}
                    alt={imageSrc}
                    onClick={() => {
                        onImageClick([imageSrc]);
                    }}
                />
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

import dayjs from 'dayjs';
import 'dayjs/locale/ko.js';
import relativeTime from 'dayjs/plugin/relativeTime';
import type ChatRoom from '@/Types/chatRoom.ts';
import formatNumber from '@/Utils/formatNumber.ts';

dayjs.locale('ko');
dayjs.extend(relativeTime);

interface Props {
    chatRoomData: ChatRoom;
    onChatRoomListItemClick({ chatRoomId, chatRoomType }: { chatRoomId: string; chatRoomType: string }): void;
    updateCurrentViewName(viewName: string): void;
}

export default function ChatRoomListItem({ chatRoomData, onChatRoomListItemClick, updateCurrentViewName }: Props) {
    const {
        profileImageUrl,
        chatRoomId,
        chatRoomName,
        unreadMessageCount,
        chatRoomType,
        lastMessageContent,
        lastMessageTime,
        memberId,
    } = chatRoomData;

    return (
        <li
            className={
                'flex cursor-pointer items-center gap-x-3.5 border-b border-slate-200 px-4 py-3.5 transition-all last:border-none hover:bg-slate-50'
            }
            onClick={() => {
                if (chatRoomType === 'DIRECT') {
                    updateCurrentViewName(
                        `chatRoomId:${chatRoomId} memberId:${memberId} otherUserName:${chatRoomName}`,
                    );
                }
                onChatRoomListItemClick({
                    chatRoomId,
                    chatRoomType,
                });
            }}
        >
            {profileImageUrl && (
                <div className={'avatar size-10 rounded-full'}>
                    <img className={'size-10 rounded-full'} src={profileImageUrl} alt={'thumbNailImg'} />
                </div>
            )}
            <div className={'flex flex-1 flex-col gap-y-1.5'}>
                <div className={'flex w-full items-center justify-between'}>
                    <h1 className={'text-[0.9rem] font-extrabold'}>{chatRoomName}</h1>
                    {lastMessageTime && (
                        <span className={'text-[0.7rem] font-bold text-slate-400'}>
                            {dayjs(
                                `${lastMessageTime[0]}-${lastMessageTime[1]}-${lastMessageTime[2]} ${lastMessageTime[3]}:${lastMessageTime[4]}:${lastMessageTime[5]}`,
                            ).fromNow(true)}{' '}
                            {} 전
                        </span>
                    )}
                </div>
                <div className={'flex justify-between gap-x-1'}>
                    <p className={'line-clamp-1 text-[0.75rem] text-slate-500'}>{lastMessageContent}</p>
                    {unreadMessageCount !== 0 && (
                        <div
                            className={
                                'flex size-[1.3rem] shrink-0 items-center justify-center self-end rounded-full bg-plump-purple-600 text-[0.57rem] font-bold text-white'
                            }
                        >
                            <span>{unreadMessageCount >= 100 ? '99+' : formatNumber(unreadMessageCount, 0)}</span>
                        </div>
                    )}
                </div>
            </div>
        </li>
    );
}

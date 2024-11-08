import dayjs from 'dayjs';
import 'dayjs/locale/ko.js';
import relativeTime from 'dayjs/plugin/relativeTime';
import { RiDeleteBack2Line } from 'react-icons/ri';
import type { Notification } from '@/Types/notification.ts';

dayjs.extend(relativeTime);

interface Props {
    notification: Notification;
    onDeleteNotificationButtonClick(id: string): void;
    onNotificationListItemClick(id: string, senderId: string, notification: Notification): void;
}

export default function NotificationListItem({
    notification,
    onDeleteNotificationButtonClick,
    onNotificationListItemClick,
}: Props) {
    return (
        <li
            className={
                'flex w-full cursor-pointer gap-x-3 border-b border-slate-200 bg-white px-3.5 py-3 transition-all last:border-none hover:bg-slate-50'
            }
            onClick={() => {
                onNotificationListItemClick(notification.id, notification.senderId, notification);
            }}
        >
            <div className={'avatar size-8 rounded-full'}>
                <img
                    className={'size-8 rounded-full'}
                    src={notification.profileImageUrl}
                    alt={`${notification.senderNickname}'s profile image`}
                />
            </div>
            <div className={'flex min-w-0 flex-1 flex-col gap-y-2'}>
                <div className={'flex w-full flex-col gap-y-1'}>
                    <h3 className={'line-clamp-2 text-[0.8rem] font-bold'}>
                        {notification.notificationType === 'POST'
                            ? `${notification.senderNickname}님이 새로운 게시글을 작성하였어요.`
                            : notification.notificationType === 'COMMENT'
                              ? `${notification.senderNickname}님이 내 게시글에 댓글을 달았어요.`
                              : notification.notificationType === 'FOLLOW'
                                ? `${notification.senderNickname}님이 나를 팔로우 했어요.`
                                : `도메인 추가 요청이 ${notification.content}되었습니다.`}
                    </h3>
                    <p className={'text-[0.7rem] text-slate-400'}>
                        {notification.notificationType === 'POST' ? (
                            <>
                                {notification.senderNickname} 님이{' '}
                                <span className={'w-fit font-bold text-slate-600'}>{notification.title}</span> 게시글을
                                작성하였어요. 게시글을 확인해보세요.
                            </>
                        ) : notification.notificationType === 'COMMENT' ? (
                            <>
                                {notification.senderNickname} 님이{' '}
                                <span className={'font-bold text-slate-600'}>{notification.title}</span> 게시글에 댓글을
                                달았어요. 게시글을 확인해보세요.
                            </>
                        ) : notification.notificationType === 'FOLLOW' ? (
                            <>
                                {notification.senderNickname}님이 나를 팔로우 했어요. {notification.senderNickname}님의
                                정보를 확인해보세요.
                            </>
                        ) : (
                            <>
                                {notification.content === '승인'
                                    ? '현직자 인증을 진행 해보세요.'
                                    : '확인되지 않은 도메인입니다.'}
                            </>
                        )}
                    </p>
                </div>
                <div className={'text-[0.75rem] font-bold text-slate-500'}>
                    <span>
                        {dayjs(
                            `${notification.createdTime[0]}-${notification.createdTime[1]}-${notification.createdTime[2]} ${notification.createdTime[3]}:${notification.createdTime[4]}:${notification.createdTime[5]}`,
                        ).fromNow(true)}{' '}
                        전
                    </span>
                </div>
            </div>
            <div className={'flex flex-col items-center justify-between'}>
                <div
                    className={`size-2 rounded-full ${notification.read ? 'bg-slate-300' : 'bg-gradient-to-br from-violet-500 to-indigo-500'}`}
                />
                <button
                    type={'button'}
                    onClick={event => {
                        event.stopPropagation();
                        onDeleteNotificationButtonClick(notification.id);
                    }}
                >
                    <RiDeleteBack2Line className={'size-5 text-neutral-800'} />
                </button>
            </div>
        </li>
    );
}

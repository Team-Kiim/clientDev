import dayjs from 'dayjs';
import 'dayjs/locale/ko.js';
import relativeTime from 'dayjs/plugin/relativeTime';
import { RiDeleteBack2Line } from 'react-icons/ri';
import type { Notification } from '@/Types/Notification.ts';

dayjs.extend(relativeTime);

interface Props {
    notification: Notification;
    onDeleteNotificationButtonClick(id: number): void;
    onNotificationListItemClick(id: number): void;
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
                onNotificationListItemClick(notification.id);
            }}
        >
            <div className={'avatar size-8 rounded-full'}>
                <img
                    className={'size-8 rounded-full'}
                    src={notification.profileImagePath}
                    alt={notification.profileImageName}
                />
            </div>
            <div className={'flex min-w-0 flex-1 flex-col gap-y-2'}>
                <div className={'flex w-full flex-col gap-y-1'}>
                    <h3 className={'line-clamp-2 text-[0.8rem] font-bold'}>{notification.title}</h3>
                    <p className={'line-clamp-2 text-[0.7rem] text-slate-400'}>{notification.content}</p>
                </div>
                <div className={'text-[0.75rem] font-bold text-slate-500'}>
                    <span>
                        {dayjs(
                            `${notification.createdTime[0]}-${notification.createdTime[1]}-${notification.createdTime[2]}`,
                        ).fromNow(true)}{' '}
                        전
                    </span>
                </div>
            </div>
            <div className={'flex h-full flex-col items-center justify-between'}>
                <div
                    className={`size-2 rounded-full ${notification.read ? 'bg-slate-300' : 'bg-gradient-to-br from-violet-600 to-purple-500'}`}
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

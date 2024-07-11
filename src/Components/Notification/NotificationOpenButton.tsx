import { HiOutlineBell } from 'react-icons/hi2';

interface Props {
    hasNewNotification: boolean;
    onNotificationButtonClick(): void;
}

export default function NotificationOpenButton({ hasNewNotification, onNotificationButtonClick }: Props) {
    return (
        <div className={'relative'}>
            {hasNewNotification && <div className={'absolute -top-0 right-0 size-2.5 rounded-full bg-rose-500'} />}
            <button
                className={'rounded-full p-1 transition-all hover:bg-slate-100'}
                onClick={() => {
                    onNotificationButtonClick();
                }}
            >
                <HiOutlineBell className={'size-7'} />
            </button>
        </div>
    );
}

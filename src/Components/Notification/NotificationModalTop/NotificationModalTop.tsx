import DeleteAllNotificationsButton from '@/Components/Notification/NotificationModalTop/DeleteAllNotificationsButton.tsx';

interface Props {
    numberOfNotifications: number;
}

export default function NotificationModalTop({ numberOfNotifications }: Props) {
    return (
        <div className={'flex items-center justify-between px-4 pb-2 pt-3'}>
            <div className={'flex items-center gap-x-2'}>
                <h1 className={'text-[0.95rem] font-extrabold'}>알림</h1>
                <div className={'rounded-full bg-neutral-800 px-2 py-1 text-[0.7rem] font-bold text-white'}>
                    <span>{numberOfNotifications >= 100 ? '99+' : numberOfNotifications}</span>
                </div>
            </div>
            <DeleteAllNotificationsButton />
        </div>
    );
}

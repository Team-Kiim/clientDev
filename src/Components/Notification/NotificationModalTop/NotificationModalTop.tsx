import ReadAllNotificationsButton from '@/Components/Notification/NotificationModalTop/ReadAllNotificationsButton.tsx';
import DeleteAllNotificationsButton from '@/Components/Notification/NotificationModalTop/DeleteAllNotificationsButton.tsx';

interface Props {
    isNotificationListRequestLoading: boolean;
    isNotificationListRequestFailed: boolean;
    isDeleteAllNotificationsRequested: boolean;
    numberOfNotifications: number | null;
    openDeleteWarningModal(): void;
}

export default function NotificationModalTop({
    isNotificationListRequestLoading,
    isNotificationListRequestFailed,
    isDeleteAllNotificationsRequested,
    numberOfNotifications,
    openDeleteWarningModal,
}: Props) {
    return (
        <div className={'flex items-center justify-between border-b border-slate-200 px-4 pb-2 pt-3'}>
            <div className={'flex items-center gap-x-2'}>
                <h2 className={'text-[0.95rem] font-extrabold'}>알림</h2>
                {numberOfNotifications !== null && (
                    <div
                        className={
                            'flex items-center justify-center rounded-full bg-plump-purple-600 px-2 py-0.5 text-[0.7rem] font-bold text-white'
                        }
                    >
                        <span>{numberOfNotifications >= 100 ? '99+' : numberOfNotifications}</span>
                    </div>
                )}
            </div>
            <div className={'flex items-center gap-x-2'}>
                <ReadAllNotificationsButton
                    isButtonDisabled={isNotificationListRequestFailed || isNotificationListRequestLoading}
                />
                <DeleteAllNotificationsButton
                    isButtonDisabled={
                        isNotificationListRequestFailed ||
                        isNotificationListRequestLoading ||
                        isDeleteAllNotificationsRequested
                    }
                    openDeleteWarningModal={openDeleteWarningModal}
                />
            </div>
        </div>
    );
}

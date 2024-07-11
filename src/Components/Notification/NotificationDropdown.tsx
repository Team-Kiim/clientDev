import NotificationDeleteButton from '@/Components/Notification/NotificationDeleteButton.tsx';
import NotificationList from '@/Components/Notification/NotificationList.tsx';

interface Props {
    numberOfNotifications: number;
}

export default function NotificationDropdown({ numberOfNotifications }: Props) {
    return (
        <div
            className={'absolute -left-1 top-12 z-10 flex h-[30rem] w-[24rem] flex-col rounded-lg bg-white shadow-2xl'}
        >
            <div className={'flex items-center justify-between border-b border-slate-200 px-4 py-3'}>
                <div className={'flex items-center gap-x-2'}>
                    <h1 className={'text-[0.94rem] font-bold'}>알림</h1>
                    <div className={'rounded-full bg-black px-2 py-1 text-[0.7rem] font-bold text-white'}>
                        <span>{numberOfNotifications >= 100 ? '99+' : numberOfNotifications}</span>
                    </div>
                </div>
                <NotificationDeleteButton />
            </div>
            <NotificationList />
        </div>
    );
}

import NotificationListItem from '@/Components/Notification/NotificationListItem.tsx';

export default function NotificationList() {
    return (
        <ul
            className={
                'flex shrink-0 grow basis-0 flex-col gap-y-3 overflow-y-auto overscroll-y-contain rounded-b-lg bg-slate-100 p-2'
            }
        >
            {[1, 2, 3, 4, 5, 6, 7].map(element => {
                return <NotificationListItem key={element} />;
            })}
        </ul>
    );
}

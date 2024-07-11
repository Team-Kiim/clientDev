export default function NotificationDeleteButton() {
    const handleNotificationDeleteButtonClick = () => {
        console.log('delete all notifications');
    };

    return (
        <button
            className={'rounded-lg px-2 py-1.5 text-[0.85rem] font-bold transition-all hover:bg-slate-100'}
            onClick={handleNotificationDeleteButtonClick}
        >
            알림 삭제
        </button>
    );
}

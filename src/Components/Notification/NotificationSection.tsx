import { useModal } from '@/Hooks/useModal.ts';
import NotificationOpenButton from '@/Components/Notification/NotificationOpenButton.tsx';
import NotificationModal from '@/Components/Notification/NotificationModal.tsx';

export default function NotificationSection() {
    const { modalRef, isModalOpen, setIsModalOpen } = useModal<HTMLDivElement>({
        canCloseOnOutsideClick: true,
    });

    const handleNotificationButtonClick = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className={'relative flex items-center justify-center'} ref={modalRef}>
            <NotificationOpenButton
                hasNewNotification={true}
                onNotificationButtonClick={handleNotificationButtonClick}
            />
            {isModalOpen && <NotificationModal numberOfNotifications={100} />}
        </div>
    );
}

import { MessageEvent } from 'event-source-polyfill';
import { useEffect, useRef, useState } from 'react';
import { useModal } from '@/Hooks/useModal.ts';
import useEventSourceStore from '@/Stores/useEventSourceStore.ts';
import NotificationOpenButton from '@/Components/Notification/NotificationOpenButton.tsx';
import NotificationModal from '@/Components/Notification/NotificationModal.tsx';

export default function NotificationSection() {
    const { eventSource } = useEventSourceStore(state => state);

    const { modalRef, isModalOpen, setIsModalOpen } = useModal<HTMLDivElement>({
        canCloseOnOutsideClick: true,
    });

    const isModalOpenRef = useRef(isModalOpen);

    const [isUserChecked, setIsUserChecked] = useState(true);

    useEffect(() => {
        eventSource.addEventListener('message', (event: MessageEvent) => {
            if (event.data === 'connected') {
                return;
            }
            if (!isModalOpenRef.current) {
                setIsUserChecked(false);
            }
        });
    }, []);

    const handleNotificationButtonClick = () => {
        setIsModalOpen(!isModalOpen);
        isModalOpenRef.current = !isModalOpen;
        setIsUserChecked(true);
    };

    return (
        <div className={'relative flex items-center justify-center'} ref={modalRef}>
            <NotificationOpenButton
                isUserChecked={isUserChecked}
                onNotificationButtonClick={handleNotificationButtonClick}
            />
            {isModalOpen && <NotificationModal />}
        </div>
    );
}

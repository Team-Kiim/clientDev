import ky from 'ky';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useModal } from '@/Hooks/useModal.ts';
import MyChatButton from '@/Components/MyChat/MyChatButton.tsx';
import MyChatModal from '@/Components/MyChat/MyChatModal/MyChatModal.tsx';

export default function MyChatSection() {
    const { pathname } = useLocation();

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const { modalRef, isModalOpen, setIsModalOpen } = useModal<HTMLDivElement>({
        canCloseOnOutsideClick: false,
    });

    const handleMyChatButtonClick = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        if (!isModalOpen) {
            ky.get('/api/chat-room/close-all').catch();
        }
    }, [isModalOpen]);

    useEffect(() => {
        if (pathname.includes('chat')) {
            setIsModalOpen(false);
        }
    }, [pathname]);

    return (
        <div className={'fixed bottom-16 right-36'} ref={modalRef}>
            <MyChatButton
                isModalOpen={isModalOpen}
                isButtonDisabled={pathname.includes('chat') || isButtonDisabled}
                onMyChatButtonClick={handleMyChatButtonClick}
            />
            {isModalOpen && (
                <MyChatModal
                    updateIsButtonDisabled={state => {
                        setIsButtonDisabled(state);
                    }}
                />
            )}
        </div>
    );
}

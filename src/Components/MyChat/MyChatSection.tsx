import { useModal } from '@/Hooks/useModal.ts';
import MyChatButton from '@/Components/MyChat/MyChatButton.tsx';
import MyChatModal from '@/Components/MyChat/MyChatModal/MyChatModal.tsx';

export default function MyChatSection() {
    const { modalRef, isModalOpen, setIsModalOpen } = useModal<HTMLDivElement>();

    const handleMyChatButtonClick = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className={'fixed bottom-16 right-36'} ref={modalRef}>
            <MyChatButton isModalOpen={isModalOpen} onMyChatButtonClick={handleMyChatButtonClick} />
            {isModalOpen && <MyChatModal />}
        </div>
    );
}

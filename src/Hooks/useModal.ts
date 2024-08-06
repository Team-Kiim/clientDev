import { useEffect, useRef, useState } from 'react';

interface ModalOptions {
    canCloseOnOutsideClick: boolean;
}

export const useModal = <T extends HTMLElement>({ canCloseOnOutsideClick }: ModalOptions) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const modalRef = useRef<T>(null);

    useEffect(() => {
        if (canCloseOnOutsideClick) {
            const handleOutSideClick = (event: MouseEvent) => {
                if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                    setIsModalOpen(false);
                }
            };

            document.addEventListener('mousedown', handleOutSideClick);
            return () => {
                document.removeEventListener('mousedown', handleOutSideClick);
            };
        }
    }, [modalRef]);

    return {
        modalRef,
        isModalOpen,
        setIsModalOpen,
    };
};

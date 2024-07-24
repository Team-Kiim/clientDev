import Modal from 'react-modal';
import { useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import PasswordResetView from '@/Pages/sign_in/Component/PasswordReset/PasswordResetView.tsx';
import PasswordResetCompleteView from '@/Pages/sign_in/Component/PasswordReset/PasswordResetCompleteView.tsx';

interface Props {
    isModalOpen: boolean;
    closeModal(): void;
}

export default function PasswordResetModal({ isModalOpen, closeModal }: Props) {
    const [isPasswordReset, setIsPasswordReset] = useState(false);

    return (
        <Modal
            isOpen={isModalOpen}
            className={
                'fixed left-1/2 top-1/2 w-[28rem] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl bg-white px-12 py-10'
            }
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 50%)',
                    zIndex: 60,
                },
            }}
            closeTimeoutMS={280}
            onAfterClose={() => {
                setIsPasswordReset(false);
            }}
        >
            <button
                className={'absolute right-5 top-3 rounded-full p-1.5 transition-all hover:bg-slate-100'}
                type={'button'}
                onClick={() => {
                    closeModal();
                }}
            >
                <HiXMark className={'size-7'} />
            </button>
            {isPasswordReset ? (
                <PasswordResetCompleteView closeModal={closeModal} />
            ) : (
                <PasswordResetView
                    completePasswordReset={() => {
                        setIsPasswordReset(true);
                    }}
                />
            )}
        </Modal>
    );
}

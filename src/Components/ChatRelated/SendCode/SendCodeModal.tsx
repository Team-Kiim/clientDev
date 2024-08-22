import Modal from 'react-modal';
import { GoX } from 'react-icons/go';
import SendCodeForm from '@/Components/ChatRelated/SendCode/SendCodeForm.tsx';

interface Props {
    isSendCodeModalOpen: boolean;
    closeSendCodeModal(): void;
}

export default function SendCodeModal({ isSendCodeModalOpen, closeSendCodeModal }: Props) {
    return (
        <Modal
            isOpen={isSendCodeModalOpen}
            className={'fixed left-1/2 top-1/2 w-[85rem] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-8'}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 50%)',
                    zIndex: 60,
                },
            }}
            closeTimeoutMS={280}
        >
            <button
                className={'absolute right-8 top-8 rounded-full p-1 transition-all hover:bg-slate-100'}
                type={'button'}
                onClick={() => {
                    closeSendCodeModal();
                }}
            >
                <GoX className={'size-8'} />
            </button>
            <div className={'flex flex-col gap-y-5'}>
                <h1 className={'mx-0.5 text-lg font-extrabold'}>소스 코드 전송</h1>
                <SendCodeForm closeSendCodeModal={closeSendCodeModal} />
            </div>
        </Modal>
    );
}

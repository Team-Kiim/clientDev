import Modal from 'react-modal';
import { HiXMark } from 'react-icons/hi2';
import { MdDomainAdd } from 'react-icons/md';
import AddCorpInfoForm from '@/Pages/admin/manage/domain/Components/AddCorpInfoForm.tsx';

interface Props {
    isModalOpen: boolean;
    closeModal: () => void;
}

export default function AddCorpInfoModal({ isModalOpen, closeModal }: Props) {
    return (
        <Modal
            isOpen={isModalOpen}
            className={
                'fixed left-1/2 top-1/2 flex w-[30rem] -translate-x-1/2 -translate-y-1/2 flex-col gap-y-3 rounded-xl bg-white p-4'
            }
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 50%)',
                    zIndex: 60,
                },
            }}
            closeTimeoutMS={280}
            onAfterOpen={() => {
                document.body.style.overflowY = 'hidden';
            }}
            onAfterClose={() => {
                document.body.style.overflowY = 'auto';
            }}
        >
            <div className={'flex w-full justify-end'}>
                <button
                    className={'rounded-full p-1.5 transition-all hover:bg-slate-100'}
                    type={'button'}
                    onClick={() => {
                        closeModal();
                    }}
                >
                    <HiXMark className={'size-7'} />
                </button>
            </div>
            <div className={'flex flex-col gap-y-8'}>
                <div className={'mx-2 flex gap-x-2 text-slate-800'}>
                    <MdDomainAdd className={'size-6'} />
                    <h1 className={'text-lg font-extrabold'}>회사정보 추가</h1>
                </div>
                <AddCorpInfoForm closeModal={closeModal} />
            </div>
        </Modal>
    );
}

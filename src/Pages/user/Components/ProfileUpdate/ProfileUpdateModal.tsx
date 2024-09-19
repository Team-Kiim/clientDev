import Modal from 'react-modal';
import { HiXMark } from 'react-icons/hi2';
import ProfileUpdateForm from '@/Pages/user/Components/ProfileUpdate/ProfileUpdateForm.tsx';

interface Props {
    isModalOpen: boolean;
    closeModal(): void;
    profileData: {
        nickname: string;
        job: string;
    };
}

export default function ProfileUpdateModal({ isModalOpen, closeModal, profileData }: Props) {
    return (
        <Modal
            isOpen={isModalOpen}
            className={
                'fixed left-1/2 top-1/2 flex w-[27rem] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl bg-white p-4'
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
            <div className={'flex justify-end'}>
                <button
                    className={'rounded-full p-1.5 transition-all hover:bg-gray-100'}
                    type={'button'}
                    onClick={closeModal}
                >
                    <HiXMark className={'size-7'} />
                </button>
            </div>
            <div className={'flex flex-col gap-y-6'}>
                <h1 className={'mx-1 text-lg font-extrabold'}>프로필 정보 수정</h1>
                <ProfileUpdateForm closeModal={closeModal} profileData={{ ...profileData }} />
            </div>
        </Modal>
    );
}

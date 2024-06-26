import { useEffect } from 'react';
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
    useEffect(() => {
        document.body.style.overflowX = 'hidden';
        return () => {
            document.body.style.overflowX = 'auto';
        };
    }, []);

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
            <h1 className={'mx-2 mb-5 text-[1.1rem] font-bold'}>프로필 정보 수정</h1>
            <ProfileUpdateForm closeModal={closeModal} profileData={{ ...profileData }} />
        </Modal>
    );
}

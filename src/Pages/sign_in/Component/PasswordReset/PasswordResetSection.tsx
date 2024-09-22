import { useReducer } from 'react';
import PasswordResetModal from '@/Pages/sign_in/Component/PasswordReset/PasswordResetModal.tsx';

export default function PasswordResetSection() {
    const [isModalOpen, toggleIsModalOpen] = useReducer((state: boolean) => !state, false);

    return (
        <>
            <div className={'flex items-center gap-x-2 text-[0.8rem]'}>
                <button
                    className={'text-[0.8rem] font-bold text-plump-purple-600 hover:underline hover:underline-offset-4'}
                    type={'button'}
                    onClick={() => {
                        toggleIsModalOpen();
                    }}
                >
                    비밀번호 찾기
                </button>
            </div>
            <PasswordResetModal
                isModalOpen={isModalOpen}
                closeModal={() => {
                    toggleIsModalOpen();
                }}
            />
        </>
    );
}

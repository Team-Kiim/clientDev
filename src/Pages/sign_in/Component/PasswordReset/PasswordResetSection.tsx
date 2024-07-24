import { useReducer } from 'react';
import PasswordResetModal from '@/Pages/sign_in/Component/PasswordReset/PasswordResetModal.tsx';

export default function PasswordResetSection() {
    const [isModalOpen, toggleIsModalOpen] = useReducer((state: boolean) => !state, false);

    return (
        <>
            <div>
                <button
                    className={
                        'text-[0.85rem] font-bold text-violet-700 transition-all hover:underline hover:decoration-violet-700 hover:underline-offset-4'
                    }
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

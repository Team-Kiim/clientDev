import { useState } from 'react';
import EmployeeVerificationModal from '@/Pages/user/Components/EmployeeVerification/EmployeeVerificationModal.tsx';

export default function EmployeeVerificationSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEmployeeVerificationButtonClick = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <div className={'flex justify-end'}>
                <button
                    className={
                        'rounded-3xl bg-gradient-to-r from-plump-purple-600 to-rose-500 px-3.5 py-2.5 text-[0.85rem] font-extrabold text-white'
                    }
                    type={'button'}
                    onClick={handleEmployeeVerificationButtonClick}
                >
                    현직자 인증
                </button>
            </div>
            <EmployeeVerificationModal
                isModalOpen={isModalOpen}
                closeModal={() => {
                    setIsModalOpen(false);
                }}
            />
        </>
    );
}

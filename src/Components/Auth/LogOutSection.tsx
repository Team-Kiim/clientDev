import { useState } from 'react';
import AuthModal from '@/Components/Auth/AuthModal.tsx';

export default function LogOutSection() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    return (
        <>
            <div className={'justify-self-end'}>
                <button
                    className={
                        'rounded-lg bg-violet-600 px-3.5 py-2.5 text-[0.9rem] font-semibold text-white transition-all hover:bg-violet-700'
                    }
                    onClick={() => {
                        setIsAuthModalOpen(true);
                    }}
                >
                    로그인
                </button>
            </div>
            <AuthModal
                isAuthModalOpen={isAuthModalOpen}
                closeModal={() => {
                    setIsAuthModalOpen(false);
                }}
            />
        </>
    );
}

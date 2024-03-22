import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { XMarkIcon } from '@heroicons/react/24/outline';
import SignInButtons from '@/Components/Auth/SignInButtons.tsx';
import SignUpButtons from '@/Components/Auth/SignUpButtons.tsx';

interface Props {
    isAuthModalOpen: boolean;
    closeModal: () => void;
}

export default function AuthModal({ isAuthModalOpen, closeModal }: Props) {
    const [isSignUpMode, setIsSignUpMode] = useState(false);

    return (
        <Modal
            isOpen={isAuthModalOpen}
            style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 50%)', zIndex: 10 } }}
            className={
                'fixed left-1/2 top-1/2 flex w-[25rem] -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg border border-white bg-white px-12 py-7 focus:outline-none'
            }
            closeTimeoutMS={280}
        >
            <button
                className={'-mx-3 w-fit self-end rounded-full p-1 transition-all hover:bg-gray-100'}
                type={'button'}
                onClick={() => {
                    closeModal();
                }}
            >
                <XMarkIcon className={'size-8'} />
            </button>
            <Link
                className={'mb-10 inline-block text-center text-4xl font-bold text-violet-600'}
                to={'/'}
                replace
                onClick={() => {
                    closeModal();
                }}
            >
                KoffeeChat
            </Link>
            <div className={'flex flex-col items-center'}>
                {isSignUpMode ? <SignUpButtons /> : <SignInButtons />}
                <div className={'divider text-gray-400'} />
                <span
                    className={
                        'cursor-pointer text-base font-semibold text-gray-500 transition-all hover:text-violet-600'
                    }
                    onClick={() => {
                        setIsSignUpMode(!isSignUpMode);
                    }}
                >
                    {isSignUpMode ? '소셜 계정으로 로그인' : '소셜 계정으로 회원가입'}
                </span>
            </div>
        </Modal>
    );
}

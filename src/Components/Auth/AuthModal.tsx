import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { XMarkIcon } from '@heroicons/react/24/outline';
import SignInForm from '@/Components/Auth/SignInForm.tsx';
import SignUpForm from '@/Components/Auth/SignUpForm.tsx';
import OAuthSection from '@/Components/Auth/OAuthSection/OAuthSection.tsx';

interface Props {
    isAuthModalOpen: boolean;
    closeModal: () => void;
}

export default function AuthModal({ isAuthModalOpen, closeModal }: Props) {
    const [isSignUpMode, setIsSignUpMode] = useState(false);

    useEffect(() => {
        if (isAuthModalOpen) {
            document.body.style.overflow = 'hidden';
            setIsSignUpMode(false);
        }

        return () => {
            document.body.style.overflow = 'scroll';
        };
    }, [isAuthModalOpen]);

    return (
        <Modal
            isOpen={isAuthModalOpen}
            style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 50%)', zIndex: 60 } }}
            className={
                'fixed left-1/2 top-1/2 z-[60] flex w-[30rem] -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg border border-white bg-white px-12 py-7 focus:outline-none'
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
                className={'logo mb-10 self-center text-4xl text-violet-600'}
                to={'/'}
                replace
                onClick={() => {
                    closeModal();
                }}
            >
                KoffeeChat
            </Link>
            <div className={'flex flex-col items-center gap-y-8'}>
                {isSignUpMode ? (
                    <div className={'flex w-full flex-col gap-y-2'}>
                        <SignUpForm />
                        <div className={'divider text-sm text-gray-500'}>소셜로 회원가입</div>
                        <OAuthSection />
                    </div>
                ) : (
                    <div className={'flex w-full flex-col gap-y-2'}>
                        <SignInForm
                            closeModal={() => {
                                closeModal();
                            }}
                        />
                        <div className={'divider text-sm text-gray-500'}>소셜로 로그인</div>
                        <OAuthSection />
                    </div>
                )}
                <div className={'flex w-full justify-end'}>
                    <span
                        className={
                            'cursor-pointer text-[0.9rem] font-semibold text-gray-600 transition-all hover:text-violet-600'
                        }
                        onClick={() => {
                            setIsSignUpMode(!isSignUpMode);
                        }}
                    >
                        {isSignUpMode ? '로그인' : '회원가입'}
                    </span>
                </div>
            </div>
        </Modal>
    );
}

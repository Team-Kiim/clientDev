import { Link, useLocation } from 'react-router-dom';
import { HiOutlineChatBubbleOvalLeftEllipsis } from 'react-icons/hi2';
import NotificationSection from '@/Components/Notification/NotificationSection.tsx';
import UserMenuDropdown from '@/Components/GNB/UserMenuDropdown.tsx';
import WritePostDropdown from '@/Components/GNB/WritePostDropdown.tsx';
import { useDropdown } from '@/Hooks/useDropdown.ts';
import useAuth from '@/Hooks/Auth/useAuth.tsx';
import { useEffect } from 'react';

export default function LoginSection() {
    const { pathname } = useLocation();

    const { user } = useAuth();

    const { profileImageUrl } = user;

    const {
        isDropdownOpen: isWritePostDropdownOpen,
        setIsDropdownOpen: setIsWritePostDropdownOpen,
        dropdownRef: writePostDropdownRef,
    } = useDropdown<HTMLDivElement>();

    const {
        isDropdownOpen: isUserProfileDropdownOpen,
        setIsDropdownOpen: setIsUserProfileDropdownOpen,
        dropdownRef: userProfileDropdownRef,
    } = useDropdown<HTMLDivElement>();

    useEffect(() => {
        setIsWritePostDropdownOpen(false);
        setIsUserProfileDropdownOpen(false);
    }, [pathname]);

    return (
        <div className={'relative flex items-center gap-x-6 justify-self-end'}>
            <NotificationSection />
            <Link className={'rounded-full p-1 transition-all hover:bg-slate-100'} to={'/chats'}>
                <HiOutlineChatBubbleOvalLeftEllipsis className={'size-7'} />
            </Link>
            <div ref={userProfileDropdownRef}>
                <button
                    className={'flex items-center'}
                    type={'button'}
                    onClick={() => {
                        setIsUserProfileDropdownOpen(!isUserProfileDropdownOpen);
                    }}
                >
                    <div className={'avatar flex items-center'}>
                        <div className={'size-7 rounded-full'}>
                            <img src={profileImageUrl} alt={'user profile image'} />
                        </div>
                    </div>
                </button>
                {isUserProfileDropdownOpen && <UserMenuDropdown />}
            </div>
            <div ref={writePostDropdownRef}>
                <button
                    className={
                        'rounded-3xl border-2 border-plump-purple-600 px-4 py-1.5 text-[0.9rem] font-extrabold text-plump-purple-600 transition-all hover:bg-plump-purple-50'
                    }
                    type={'button'}
                    onClick={() => {
                        setIsWritePostDropdownOpen(!isWritePostDropdownOpen);
                    }}
                >
                    글쓰기
                </button>
                {isWritePostDropdownOpen && <WritePostDropdown />}
            </div>
        </div>
    );
}

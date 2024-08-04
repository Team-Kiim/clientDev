import { useDropdown } from '@/Hooks/useDropdown.ts';
import NotificationOpenButton from '@/Components/Notification/NotificationOpenButton.tsx';
import NotificationDropdown from '@/Components/Notification/NotificationDropdown.tsx';

export default function NotificationSection() {
    const { dropdownRef, isDropdownOpen, setIsDropdownOpen } = useDropdown<HTMLDivElement>();

    const handleNotificationButtonClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className={'relative flex items-center justify-center'} ref={dropdownRef}>
            <NotificationOpenButton
                hasNewNotification={true}
                onNotificationButtonClick={handleNotificationButtonClick}
            />
            {isDropdownOpen && <NotificationDropdown numberOfNotifications={100} />}
        </div>
    );
}

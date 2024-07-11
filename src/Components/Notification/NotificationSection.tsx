import { useEffect, useRef, useState } from 'react';
import NotificationOpenButton from '@/Components/Notification/NotificationOpenButton.tsx';
import NotificationDropdown from '@/Components/Notification/NotificationDropdown.tsx';

export default function NotificationSection() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

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

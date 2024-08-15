import { useState } from 'react';
import NotificationModalTop from '@/Components/Notification/NotificationModalTop/NotificationModalTop.tsx';
import NotificationFilters from '@/Components/Notification/NotificationFilters.tsx';
import NotificationList from '@/Components/Notification/NotificationList.tsx';

interface Props {
    numberOfNotifications: number;
}

export default function NotificationModal({ numberOfNotifications }: Props) {
    const [currentFilter, setCurrentFilter] = useState({ value: 'all', label: '전체' });

    const updateCurrentFilter = (filter: { value: string; label: string }) => {
        setCurrentFilter(filter);
    };

    return (
        <div
            className={
                'notificationModal absolute -left-1 top-12 z-10 flex h-[34rem] w-[23rem] flex-col rounded-lg bg-white shadow-2xl'
            }
        >
            <NotificationModalTop numberOfNotifications={numberOfNotifications} />
            <NotificationFilters currentFilter={currentFilter} updateNotificationFilter={updateCurrentFilter} />
            <NotificationList />
        </div>
    );
}

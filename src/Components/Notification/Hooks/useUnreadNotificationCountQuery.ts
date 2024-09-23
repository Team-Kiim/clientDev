import { useQuery } from '@tanstack/react-query';
import { fetchUnreadNotificationCount } from '@/Components/Notification/Utils/fetchUnreadNotificationCount.ts';

export default function useUnreadNotificationCountQuery() {
    return useQuery({
        queryKey: ['user', 'notifications', 'unreadCount'],
        queryFn: fetchUnreadNotificationCount,
        gcTime: 0,
    });
}

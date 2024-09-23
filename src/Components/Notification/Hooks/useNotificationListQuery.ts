import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchNotificationList } from '@/Components/Notification/Utils/fetchNotificationList.tsx';

export default function useNotificationListQuery({ filter }: { filter: string }) {
    const infiniteQueryResult = useInfiniteQuery({
        queryKey: ['user', 'notifications', { filter }],
        queryFn: fetchNotificationList,
        initialPageParam: 0,
        getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.length < 16 ? null : lastPageParam + 1),
        gcTime: 0,
    });

    return {
        ...infiniteQueryResult,
        notificationList: infiniteQueryResult.data?.pages?.flat(),
    };
}

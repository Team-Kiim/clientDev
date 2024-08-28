import { EventSourcePolyfill } from 'event-source-polyfill';
import { useEffect, useState } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import NotificationModalTop from '@/Components/Notification/NotificationModalTop/NotificationModalTop.tsx';
import NotificationFilters from '@/Components/Notification/NotificationFilters.tsx';
import NotificationLoading from '@/Components/Notification/NotificationLoading.tsx';
import NotificationList from '@/Components/Notification/NotificationList/NotificationList.tsx';
import NotificationErrorFallback from '@/Components/Notification/NotificationErrorFallback.tsx';
import { getNotificationList } from '@/Components/Notification/Utils/getNotificationList.tsx';

interface Props {
    eventSource: EventSourcePolyfill;
}

interface NotificationFilter {
    value: string;
    label: string;
}

const notificationFilters: NotificationFilter[] = [
    { value: 'all', label: '전체' },
    { value: 'post', label: '게시글' },
    { value: 'comment', label: '댓글' },
    { value: 'follow', label: '팔로우' },
];

export default function NotificationModal({ eventSource }: Props) {
    const queryClient = useQueryClient();

    const [notificationFilter, setNotificationFilter] = useState<NotificationFilter>(notificationFilters[0]);

    const handleNotificationFilterButtonClick = (filter: NotificationFilter) => {
        setNotificationFilter(filter);
    };

    const { data, isLoading, isError, refetch } = useInfiniteQuery({
        queryKey: ['user', 'notifications'],
        queryFn: getNotificationList,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < 16) {
                return undefined;
            }
            return allPages.length * 16;
        },
        gcTime: 0,
    });

    useEffect(() => {
        if (eventSource) {
            eventSource.addEventListener('message', () => {
                return queryClient.invalidateQueries({
                    queryKey: ['user', 'notifications'],
                });
            });
        }
    }, []);

    const notificationList = data?.pages?.flat();

    return (
        <div
            className={
                'notificationModal absolute -left-1 top-12 z-10 flex h-[35rem] w-[23rem] flex-col gap-y-3 rounded-xl bg-white shadow-2xl'
            }
        >
            <NotificationModalTop
                isNotificationListRequestFailed={isError}
                isNotificationListRequestLoading={isLoading}
                numberOfNotifications={notificationList?.length ?? null}
            />
            <NotificationFilters
                currentFilter={notificationFilter}
                onNotificationFilterButtonClick={handleNotificationFilterButtonClick}
            />
            {isLoading ? (
                <NotificationLoading />
            ) : isError ? (
                <NotificationErrorFallback refetchNotificationList={refetch} />
            ) : (
                <NotificationList notificationList={notificationList} />
            )}
        </div>
    );
}

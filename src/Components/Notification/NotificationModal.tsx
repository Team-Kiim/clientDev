import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import NotificationModalTop from '@/Components/Notification/NotificationModalTop/NotificationModalTop.tsx';
import NotificationFilters from '@/Components/Notification/NotificationFilters.tsx';
import NotificationLoading from '@/Components/Notification/NotificationLoading.tsx';
import NotificationList from '@/Components/Notification/NotificationList/NotificationList.tsx';
import NotificationErrorFallback from '@/Components/Notification/NotificationErrorFallback.tsx';
import ModalBackground from '@/Components/UI/Modal/ModalBackground.tsx';
import DeleteWarningModal from '@/Components/Notification/DeleteAllNotificationsModal/DeleteWarningModal.tsx';
import DeleteErrorModal from '@/Components/Notification/DeleteAllNotificationsModal/DeleteErrorModal.tsx';
import useUnreadNotificationCountQuery from '@/Components/Notification/Hooks/useUnreadNotificationCountQuery.ts';
import useNotificationListQuery from '@/Components/Notification/Hooks/useNotificationListQuery.ts';
import useDeleteAllNotifications from '@/Components/Notification/Hooks/useDeleteAllNotifications.ts';
import useEventSourceStore from '@/Stores/useEventSourceStore.ts';

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

export default function NotificationModal() {
    const queryClient = useQueryClient();

    const { eventSource } = useEventSourceStore(state => state);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isDeleteAllNotificationsErrorOccurred, setIsDeleteAllNotificationsErrorOccurred] = useState(false);

    const [notificationFilter, setNotificationFilter] = useState<NotificationFilter>(notificationFilters[0]);

    const handleNotificationFilterButtonClick = (filter: NotificationFilter) => {
        setNotificationFilter(filter);
    };

    const { data: unreadNotificationCount } = useUnreadNotificationCountQuery();

    const { notificationList, isLoading, isError, refetch, fetchNextPage, hasNextPage } = useNotificationListQuery({
        filter: notificationFilter.value,
    });

    const { mutate: deleteAllNotifications, isPending } = useDeleteAllNotifications({
        successCallback: () => {
            queryClient.invalidateQueries({ queryKey: ['user', 'notifications'] }).catch();
        },

        errorCallback: () => {
            setIsModalOpen(true);
            setIsDeleteAllNotificationsErrorOccurred(true);
        },
    });

    useEffect(() => {
        const invalidateOnMessage = () => {
            return queryClient.invalidateQueries({
                queryKey: ['user', 'notifications'],
            });
        };

        if (eventSource) {
            eventSource.addEventListener('message', invalidateOnMessage);
        }

        return () => {
            if (eventSource) {
                eventSource.removeEventListener('message', invalidateOnMessage);
            }
        };
    }, []);

    return (
        <div
            className={
                '[&_div:flex-1] absolute -left-1 top-12 z-10 flex h-[35rem] w-[23rem] flex-col gap-y-3 rounded-xl bg-white shadow-2xl'
            }
        >
            <NotificationModalTop
                isNotificationListRequestFailed={isError}
                isNotificationListRequestLoading={isLoading}
                isDeleteAllNotificationsRequested={isPending}
                numberOfNotifications={unreadNotificationCount ?? null}
                openDeleteWarningModal={() => {
                    setIsModalOpen(true);
                }}
            />
            <NotificationFilters
                currentFilter={notificationFilter}
                onNotificationFilterButtonClick={handleNotificationFilterButtonClick}
            />
            {isLoading ? (
                <NotificationLoading />
            ) : isError ? (
                <NotificationErrorFallback refetchNotificationList={refetch} />
            ) : notificationList.length === 0 ? (
                <div className={'flex flex-1 items-center justify-center'}>
                    <p className={'text-center text-[0.75rem] font-bold text-slate-400'}>알림이 없습니다.</p>
                </div>
            ) : (
                <div
                    id={'scrollableDiv'}
                    className={'min-h-0 flex-1 overflow-y-auto overscroll-y-contain rounded-b-xl'}
                >
                    <InfiniteScroll
                        next={fetchNextPage}
                        scrollableTarget={'scrollableDiv'}
                        hasMore={hasNextPage}
                        loader={null}
                        dataLength={notificationList.length}
                    >
                        <NotificationList filterValue={notificationFilter.value} notificationList={notificationList} />
                    </InfiniteScroll>
                </div>
            )}
            {isModalOpen && (
                <ModalBackground>
                    {isDeleteAllNotificationsErrorOccurred ? (
                        <DeleteErrorModal
                            closeModal={() => {
                                setIsModalOpen(false);
                                setIsDeleteAllNotificationsErrorOccurred(false);
                            }}
                        />
                    ) : (
                        <DeleteWarningModal
                            closeModal={() => {
                                setIsModalOpen(false);
                            }}
                            deleteAllNotifications={deleteAllNotifications}
                        />
                    )}
                </ModalBackground>
            )}
        </div>
    );
}

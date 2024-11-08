import axios from 'axios';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import NotificationListItem from '@/Components/Notification/NotificationList/NotificationListItem.tsx';
import TOAST_OPTIONS from '@/Constants/toastOptions.ts';
import type { Notification } from '@/Types/notification.ts';
import { useNavigate } from 'react-router-dom';

interface Props {
    notificationList: Notification[];
    filterValue: string;
}

export default function NotificationList({ notificationList, filterValue }: Props) {
    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: (notificationId: string) => {
            return axios.delete(`/api/notifications/${notificationId}`);
        },

        onMutate: async (notificationId: string) => {
            await queryClient.cancelQueries({
                queryKey: ['user', 'notifications'],
            });

            const previousPages = queryClient.getQueryData<InfiniteData<Notification[]>>([
                'user',
                'notifications',
                { filter: filterValue },
            ]).pages;

            const previousUnreadNotificationCount = queryClient.getQueryData<number>([
                'user',
                'notifications',
                'unreadCount',
            ]);

            queryClient.setQueryData<InfiniteData<Notification[]>>(
                ['user', 'notifications', { filter: filterValue }],
                oldData => {
                    return {
                        ...oldData,
                        pages: previousPages.map(page => {
                            if (page.find(notification => notification.id === notificationId)) {
                                return page.filter(notification => notification.id !== notificationId);
                            } else {
                                return page;
                            }
                        }),
                    };
                },
            );

            queryClient.setQueryData<number>(['user', 'notifications', 'unreadCount'], oldData => {
                const notificationToDelete = notificationList.find(notification => notification.id === notificationId);
                return notificationToDelete.read ? oldData : oldData - 1;
            });

            return { previousPages, previousUnreadNotificationCount };
        },

        onError: (_, __, context) => {
            toast.error(
                <div className={'text-[0.85rem]'}>
                    알림을 삭제할 수 없습니다. <br />
                    잠시 후 다시 시도해주세요.
                </div>,
                TOAST_OPTIONS,
            );

            queryClient.setQueryData<InfiniteData<Notification[]>>(
                ['user', 'notifications', { filter: filterValue }],
                oldData => ({
                    ...oldData,
                    pages: context.previousPages,
                }),
            );

            queryClient.setQueryData<number>(
                ['user', 'notifications', 'unreadCount'],
                context.previousUnreadNotificationCount,
            );
        },

        onSettled: () => {
            return queryClient.invalidateQueries({
                queryKey: ['user', 'notifications'],
            });
        },
    });

    const handleDeleteNotificationButtonClick = (id: string) => {
        mutate(id);
    };

    const handleNotificationListItemClick = (id: string, senderId: string, notification: Notification) => {
        if (notification.notificationType === 'POST') {
            navigate(`/${notification.postType === 'DEV' ? 'qnas' : 'community'}/${notification.url}`);
        } else if (notification.notificationType === 'FOLLOW') {
            navigate(`/user/${senderId}`);
        } else if (notification.notificationType === 'COMMENT') {
            navigate(`/${notification.postType === 'DEV' ? 'qnas' : 'community'}/${notification.url}`, {
                state: {
                    notificationType: 'COMMENT',
                },
            });
        }

        return axios
            .patch(`/api/notifications/${id}`)
            .then(() => {
                queryClient.invalidateQueries({
                    queryKey: ['user', 'notifications'],
                });
            })
            .catch(error => console.error(error));
    };

    return (
        <ul className={'flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain rounded-b-lg '}>
            {notificationList.map(notification => (
                <NotificationListItem
                    key={notification.id}
                    notification={notification}
                    onDeleteNotificationButtonClick={handleDeleteNotificationButtonClick}
                    onNotificationListItemClick={handleNotificationListItemClick}
                />
            ))}
        </ul>
    );
}

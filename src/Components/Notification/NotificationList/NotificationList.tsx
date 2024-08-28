import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import NotificationListItem from '@/Components/Notification/NotificationList/NotificationListItem.tsx';
import TOAST_OPTIONS from '@/Constants/toastOptions.ts';
import type { Notification } from '@/Types/Notification.ts';

interface Props {
    notificationList: Notification[];
}

export default function NotificationList({ notificationList }: Props) {
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: (notificationId: number) => {
            return axios.delete(`/notifications/${notificationId}`);
        },

        onMutate: async (notificationId: number) => {
            await queryClient.cancelQueries({
                queryKey: ['user', 'notifications'],
            });

            const previousNotificationList = queryClient
                .getQueryData<{ pages: Notification[]; pageParam: number }>(['user', 'notifications'])
                .pages.flat();

            queryClient.setQueryData<{ pages: Notification[][]; pageParam: number }>(
                ['user', 'notifications'],
                oldData => {
                    return {
                        ...oldData,
                        pages: [previousNotificationList.filter(notification => notification.id !== notificationId)],
                    };
                },
            );

            return { previousNotificationList };
        },

        onError: (error, _, context) => {
            console.error(error);
            toast.error(
                <div className={'text-[0.85rem]'}>
                    알림을 삭제할 수 없습니다. <br />
                    잠시 후 다시 시도해주세요.
                </div>,
                TOAST_OPTIONS,
            );

            queryClient.setQueryData<{ pages: Notification[][]; pageParam: number }>(
                ['user', 'notifications'],
                oldData => ({
                    ...oldData,
                    pages: [context.previousNotificationList],
                }),
            );
        },

        onSettled: () => {
            return queryClient.invalidateQueries({
                queryKey: ['user', 'notifications'],
            });
        },
    });

    const handleDeleteNotificationButtonClick = (id: number) => {
        mutate(id);
    };

    const handleNotificationListItemClick = (id: number) => {
        return axios.patch(`/notifications/${id}`).catch(error => console.error(error));
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

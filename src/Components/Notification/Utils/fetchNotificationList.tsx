import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';
import type { Notification } from '@/Types/notification.ts';

type QueryKey = [_1: string, _2: string, { filter: string }];

export const fetchNotificationList: QueryFunction<Notification[], QueryKey, number> = ({ queryKey, pageParam }) => {
    const { filter } = queryKey[2];

    const notificationType = filter.toUpperCase();

    return axios
        .get(`/api/notifications?notificationType=${notificationType}&page=${pageParam}&size=16`)
        .then(response => response.data);
};

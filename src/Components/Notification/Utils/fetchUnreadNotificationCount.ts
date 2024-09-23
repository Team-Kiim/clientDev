import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';

type QueryKey = [_1: string, _2: string, _3: string];

export const fetchUnreadNotificationCount: QueryFunction<number, QueryKey> = () => {
    return axios.get('/api/notifications/unread-notifications').then(response => response.data);
};

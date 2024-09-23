import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

export default function useDeleteAllNotifications({
    successCallback,
    errorCallback,
}: {
    successCallback(...args: any[]): any;
    errorCallback(...args: any[]): any;
}) {
    return useMutation({
        mutationFn: () => {
            return axios.delete('/api/notifications');
        },

        onSuccess: () => {
            successCallback();
        },

        onError: () => {
            errorCallback();
        },
    });
}

import axios, { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import TOAST_OPTIONS from '@/Constants/toastOptions.ts';
import 'react-toastify/dist/ReactToastify.css';

export default function useUpdateStatusMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, statusToUpdate }: { id: number; statusToUpdate: 'APPROVED' | 'REJECTED' }) => {
            if (statusToUpdate === 'APPROVED') {
                return axios.patch(`/api/admin/corps/approve/${id}`);
            } else {
                return axios.patch(`/api/admin/corps/reject/${id}`);
            }
        },

        onSuccess: (_, variables) => {
            toast.success(
                <p className={'text-[0.85rem]'}>
                    {variables.statusToUpdate === 'APPROVED' ? '승인' : '거절'}되었습니다.
                </p>,
                TOAST_OPTIONS,
            );
            queryClient.invalidateQueries({
                queryKey: ['list', 'corpInfo'],
            });
        },

        onError: (error: AxiosError) => {
            console.error(error);
            toast.error(
                <p className={'text-[0.85rem] leading-relaxed'}>
                    현재 요청을 처리할 수 없습니다. <br /> 잠시 후 다시 시도해주세요.
                </p>,
                TOAST_OPTIONS,
            );
        },
    });
}

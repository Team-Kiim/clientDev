import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import TOAST_OPTIONS from '@/Constants/toastOptions.ts';
import 'react-toastify/dist/ReactToastify.css';

export default function useDeleteCorpInfoMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => axios.delete(`/api/corps/admin/${id}`),

        onSuccess: () => {
            toast.success(<p className={'text-[0.85rem]'}>성공적으로 삭제하였습니다.</p>, TOAST_OPTIONS);
            queryClient.invalidateQueries({
                queryKey: ['list', 'corpInfo'],
            });
        },

        onError: () => {
            toast.error(
                <p className={'text-[0.85rem] leading-relaxed'}>
                    현재 삭제할 수 없습니다. <br /> 잠시 후 다시 시도해주세요.
                </p>,
                TOAST_OPTIONS,
            );
        },
    });
}

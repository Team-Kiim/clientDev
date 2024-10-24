import axios, { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import TOAST_OPTIONS from '@/Constants/toastOptions.ts';
import 'react-toastify/dist/ReactToastify.css';

export default function useAddCorpInfoMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ corpName, corpEmailDomain }: { corpName: string; corpEmailDomain: string }) =>
            axios.post('/api/corps/admin', {
                corpName,
                corpEmailDomain,
            }),

        onSuccess: () => {
            toast.success(<p className={'text-[0.85rem]'}>성공적으로 추가하였습니다.</p>, TOAST_OPTIONS);
            queryClient.invalidateQueries({
                queryKey: ['list', 'corpInfo'],
            });
        },

        onError: (error: AxiosError) => {
            console.error(error);
            toast.error(
                <p className={'text-[0.85rem] leading-relaxed'}>
                    회사정보를 추가할 수 없습니다. <br /> 잠시 후 다시 시도해주세요.
                </p>,
                TOAST_OPTIONS,
            );
        },
    });
}

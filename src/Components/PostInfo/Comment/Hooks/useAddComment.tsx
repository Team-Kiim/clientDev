import ky from 'ky';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import TOAST_OPTIONS from '@/Constants/toastOptions.ts';
import 'react-toastify/dist/ReactToastify.css';

export default function useAddComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ postId, commentValue }: { postId: string; commentValue: string }) =>
            ky.post('/api/comment', {
                json: {
                    postId,
                    content: commentValue,
                },
            }),

        onSuccess: () => {
            toast.success(
                <div className={'flex flex-col gap-y-2 text-[0.85rem]'}>
                    <p className={'text-[0.85rem]'}>댓글을 성공적으로 작성하였습니다.</p>
                    <button
                        className={'rounded-3xl border border-slate-200 px-3 py-1 text-[0.85rem] text-slate-800'}
                        type={'button'}
                        onClick={() => {
                            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                        }}
                    >
                        확인하기
                    </button>
                </div>,
            );
        },

        onError: () => {
            toast.error(
                <p className={'text-[0.85rem] leading-relaxed'}>
                    댓글을 작성할 수 없습니다. <br />
                    잠시 후 다시 시도해주세요.
                </p>,
                TOAST_OPTIONS,
            );
        },

        onSettled: () =>
            queryClient.invalidateQueries({
                queryKey: ['post'],
            }),
    });
}

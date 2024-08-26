import axios, { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import TOAST_OPTIONS from '@/Constants/toastOptions.ts';
import type { PostInfo } from '@/Types/PostInfo.ts';

export const useDeleteComment = (postId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (commentId: number) => {
            return axios.delete(`/api/comment/${commentId}`);
        },

        onMutate: async (commendId: number) => {
            await queryClient.cancelQueries({
                queryKey: ['post', postId],
            });

            const previousCommentList = queryClient.getQueryData<PostInfo>(['post', postId]).commentInfoDtoList;

            queryClient.setQueryData<PostInfo>(['post', postId], oldData => {
                return {
                    ...oldData,
                    commentInfoDtoList: previousCommentList.filter(commentInfo => {
                        return commentInfo.id !== commendId;
                    }),
                };
            });

            return { previousCommentList };
        },

        onError: (error: AxiosError, _, context) => {
            console.error(error);
            toast.error(
                <div className={'text-[0.85rem]'}>
                    댓글을 삭제할 수 없습니다. <br /> 잠시 후 다시 시도해주세요.
                </div>,
                TOAST_OPTIONS,
            );
            queryClient.setQueryData<PostInfo>(['post', postId], oldData => {
                return {
                    ...oldData,
                    commentInfoDtoList: context.previousCommentList,
                };
            });
        },

        onSettled: () => {
            return queryClient.invalidateQueries({
                queryKey: ['post', postId],
            });
        },
    });
};

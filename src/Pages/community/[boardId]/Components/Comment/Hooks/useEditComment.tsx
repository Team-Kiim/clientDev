import axios, { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import TOAST_OPTIONS from '@/Constants/toastOptions.ts';
import type { PostInfo } from '@/Types/PostInfo.ts';

export const useEditComment = (postId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ newCommentValue, commentId }: { newCommentValue: string; commentId: number }) => {
            return axios.post(
                `/api/comment/modify/${commentId}`,
                {
                    content: newCommentValue,
                },
                {
                    timeout: 5000,
                },
            );
        },

        onMutate: async ({ newCommentValue, commentId }: { newCommentValue: string; commentId: number }) => {
            await queryClient.cancelQueries({
                queryKey: ['post', postId],
            });

            const previousCommentList = queryClient.getQueryData<PostInfo>(['post', postId]).commentInfoDtoList;

            queryClient.setQueryData<PostInfo>(['post', postId], oldData => {
                return {
                    ...oldData,
                    commentInfoDtoList: oldData.commentInfoDtoList.map(commentInfo => {
                        if (commentInfo.id !== commentId) {
                            return commentInfo;
                        } else {
                            return {
                                ...commentInfo,
                                content: newCommentValue,
                            };
                        }
                    }),
                };
            });

            return { previousCommentList };
        },

        onError: (error: AxiosError, _, context) => {
            console.error(error);
            toast.error(
                <div className={'text-[0.85rem]'}>
                    댓글을 수정할 수 없습니다. <br /> 잠시 후 다시 시도해 주세요.
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

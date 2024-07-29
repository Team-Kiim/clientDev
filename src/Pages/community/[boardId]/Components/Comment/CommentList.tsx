import axios from 'axios';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import CommentListItem from '@/Pages/community/[boardId]/Components/Comment/CommentListItem.tsx';
import TOAST_OPTIONS from '@/Constants/toastOptions.ts';
import type { CommentInfo, PostInfo } from '@/Types/PostInfo.ts';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    postId: string;
    commentInfoDtoList: CommentInfo[];
}

export default function CommentList({ postId, commentInfoDtoList }: Props) {
    const queryClient = useQueryClient();

    const [isCommentEditFormOpen, setIsCommentEditFormOpen] = useState(false);
    const [idOfCommentToEdit, setIdOfCommentToEdit] = useState(0);

    const [previousCommentList, setPreviousCommentList] = useState(commentInfoDtoList);

    const handleCommentEditButtonClick = (commentId: number) => {
        if (isCommentEditFormOpen) {
            if (commentId === idOfCommentToEdit) {
                setIsCommentEditFormOpen(false);
            } else {
                setIdOfCommentToEdit(commentId);
            }
            return;
        }

        setIdOfCommentToEdit(commentId);
        setIsCommentEditFormOpen(true);
    };

    const { mutate: mutateDeleteComment } = useMutation({
        mutationFn(commentId: number) {
            return axios.delete(`/api/comment/delete/${commentId}`, { timeout: 5000 });
        },

        onSuccess() {
            const updatedCommentList = queryClient.getQueryData<PostInfo>(['post', postId]).commentInfoDtoList;
            setPreviousCommentList(updatedCommentList);
        },

        onError() {
            toast.error(
                <div className={'text-[0.85rem]'}>
                    댓글을 삭제할 수 없습니다. <br /> 잠시 후 다시 시도해 주세요.
                </div>,
                TOAST_OPTIONS,
            );
            queryClient.setQueryData<PostInfo>(['post', postId], postData => {
                return {
                    ...postData,
                    commentInfoDtoList: previousCommentList,
                };
            });
        },

        // onSettled() {
        //     return queryClient.invalidateQueries({ queryKey: ['post', postId] });
        // },
    });

    const handleCommentDeleteButtonClick = async (commentId: number) => {
        if (window.confirm('정말로 댓글을 삭제하시겠습니까?')) {
            await queryClient.cancelQueries({ queryKey: ['post', postId] });

            queryClient.setQueryData<PostInfo>(['post', postId], postData => {
                return {
                    ...postData,
                    commentInfoDtoList: postData.commentInfoDtoList.filter(comment => comment.id !== commentId),
                };
            });

            mutateDeleteComment(commentId);
        }
    };

    return (
        <ul className={'flex flex-col gap-y-2.5'}>
            {commentInfoDtoList.map(commentInfo => {
                return (
                    <CommentListItem
                        key={commentInfo.id}
                        postId={postId}
                        commentInfo={commentInfo}
                        isCommentEditFormOpen={isCommentEditFormOpen}
                        idOfCommentToEdit={idOfCommentToEdit}
                        closeCommentEditForm={() => {
                            setIsCommentEditFormOpen(false);
                        }}
                        onCommentEditButtonClick={handleCommentEditButtonClick}
                        onCommentDeleteButtonClick={handleCommentDeleteButtonClick}
                    />
                );
            })}
        </ul>
    );
}

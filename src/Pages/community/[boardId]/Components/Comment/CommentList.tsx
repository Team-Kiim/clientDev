import { useState } from 'react';
import CommentListItem from '@/Pages/community/[boardId]/Components/Comment/CommentListItem.tsx';
import { useDeleteComment } from '@/Pages/community/[boardId]/Components/Comment/Hooks/useDeleteComment.tsx';
import type { CommentInfo } from '@/Types/PostInfo.ts';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    postId: string;
    commentInfoDtoList: CommentInfo[];
}

export default function CommentList({ postId, commentInfoDtoList }: Props) {
    const [isCommentEditFormOpen, setIsCommentEditFormOpen] = useState(false);
    const [idOfCommentToEdit, setIdOfCommentToEdit] = useState(0);

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

    const { mutate } = useDeleteComment(postId);

    const handleCommentDeleteButtonClick = async (commentId: number) => {
        if (window.confirm('정말로 댓글을 삭제하시겠습니까?')) {
            mutate(commentId);
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

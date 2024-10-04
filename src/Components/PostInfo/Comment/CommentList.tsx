import Swal from 'sweetalert2';
import { useState } from 'react';
import CommentListItem from '@/Components/PostInfo/Comment/CommentListItem.tsx';
import { useDeleteComment } from '@/Components/PostInfo/Comment/Hooks/useDeleteComment.tsx';
import type { CommentInfo } from '@/Types/PostInfo.ts';
import 'prism-themes/themes/prism-one-dark.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/components/prism-arduino';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csp';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-ini';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-less';
import 'prismjs/components/prism-lua';
import 'prismjs/components/prism-makefile';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-objectivec';
import 'prismjs/components/prism-markup-templating.js';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-perl';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-r';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-shell-session';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-wasm';
import 'prismjs/components/prism-xml-doc';
import 'prismjs/components/prism-yaml';
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
        Swal.fire({
            icon: 'warning',
            text: '정말로 댓글을 삭제하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            customClass: {
                cancelButton: 'text-black font-bold bg-slate-100 rounded-xl text-[0.9rem]',
                confirmButton: 'font-bold bg-plump-purple-600 rounded-xl text-[0.9rem]',
                popup: 'rounded-[2rem]',
                htmlContainer: '!text-slate-500',
            },
        }).then(result => {
            if (result.isConfirmed) {
                mutate(commentId);
            }
        });
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

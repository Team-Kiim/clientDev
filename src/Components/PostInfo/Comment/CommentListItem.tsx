import dompurify from 'dompurify';
import Prism from 'prismjs';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CommentEditForm from '@/Components/PostInfo/Comment/CommentEditForm.tsx';
import type { CommentInfo } from '@/Types/PostInfo.ts';

interface Props {
    postId: string;
    commentInfo: CommentInfo;
    isCommentEditFormOpen: boolean;
    idOfCommentToEdit: number;
    closeCommentEditForm(): void;
    onCommentEditButtonClick(commentId: number): void;
    onCommentDeleteButtonClick(commentId: number): void;
}

export default function CommentListItem({
    postId,
    commentInfo,
    isCommentEditFormOpen,
    idOfCommentToEdit,
    closeCommentEditForm,
    onCommentEditButtonClick,
    onCommentDeleteButtonClick,
}: Props) {
    const { VITE_SERVER_URL } = import.meta.env;
    const { nickname, profileImageUrl, memberWritten } = commentInfo;

    useEffect(() => {
        Array.from(document.getElementsByTagName('pre')).forEach($preElement => {
            $preElement.className += 'line-numbers';
        });
        Prism.highlightAll();
    }, [isCommentEditFormOpen]);

    return (
        <li className={'flex flex-col border-b border-slate-300 py-3.5 last:border-none'}>
            <div className={'flex gap-x-4'}>
                <Link to={`/user/${commentInfo.memberId}`}>
                    <div className={'avatar my-1 size-7'}>
                        <img
                            className={'size-7 rounded-full'}
                            src={`${VITE_SERVER_URL}/${profileImageUrl}`}
                            alt={`${nickname}'s profile image`}
                        />
                    </div>
                </Link>
                <div className={'flex min-w-0 flex-1 flex-col gap-y-4'}>
                    <div className={'flex items-center'}>
                        <div className={'flex flex-1 flex-col gap-y-0.5'}>
                            <span className={'text-[0.9rem] font-bold'}>{commentInfo.nickname}</span>
                            <span className={'text-[0.7rem] font-bold text-slate-400'}>
                                {commentInfo.createdTime[0]}년 {commentInfo.createdTime[1]}월{' '}
                                {commentInfo.createdTime[2]}일
                            </span>
                        </div>
                        {memberWritten && (
                            <div className={'flex gap-x-1'}>
                                <button
                                    className={'text-[0.8rem] font-bold text-slate-500'}
                                    type={'button'}
                                    onClick={() => {
                                        onCommentEditButtonClick(commentInfo.id);
                                    }}
                                >
                                    수정
                                </button>
                                <span>·</span>
                                <button
                                    className={'text-[0.8rem] font-bold text-slate-500'}
                                    type={'button'}
                                    onClick={() => {
                                        onCommentDeleteButtonClick(commentInfo.id);
                                    }}
                                >
                                    삭제
                                </button>
                            </div>
                        )}
                    </div>
                    {isCommentEditFormOpen && idOfCommentToEdit === commentInfo.id ? (
                        <CommentEditForm
                            postId={postId}
                            commentId={commentInfo.id}
                            originalCommentValue={commentInfo.content}
                            closeCommentEditForm={closeCommentEditForm}
                        />
                    ) : (
                        <div
                            className={
                                'prose prose-sm max-w-full text-[0.87rem] text-black [&_code]:text-[0.87rem] [&_pre]:bg-[#24273a]'
                            }
                            dangerouslySetInnerHTML={{ __html: dompurify.sanitize(commentInfo.content) }}
                        />
                    )}
                </div>
            </div>
        </li>
    );
}

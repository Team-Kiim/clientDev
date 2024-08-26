import dompurify from 'dompurify';
import Prism from 'prismjs';
import { useEffect } from 'react';
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
import CommentEditForm from '@/Pages/community/[boardId]/Components/Comment/CommentEditForm.tsx';
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
    const { profileImagePath, profileImageName } = commentInfo;

    useEffect(() => {
        Array.from(document.getElementsByTagName('pre')).forEach($preElement => {
            $preElement.className += 'line-numbers';
        });
        Prism.highlightAll();
    }, [isCommentEditFormOpen]);

    return (
        <li className={'flex flex-col border-b border-slate-300 py-3.5 last:border-none'}>
            <div className={'flex gap-x-4'}>
                <div className={'avatar my-1 size-7'}>
                    <img
                        className={'size-7 rounded-full'}
                        src={`${VITE_SERVER_URL}/image/${profileImagePath}/${profileImageName}`}
                        alt={profileImageName}
                    />
                </div>
                <div className={'flex min-w-0 flex-1 flex-col gap-y-4'}>
                    <div className={'flex items-center'}>
                        <div className={'flex flex-1 flex-col gap-y-0.5'}>
                            <span className={'text-[0.9rem] font-bold'}>{commentInfo.nickname}</span>
                            <span className={'text-[0.7rem] font-bold text-slate-400'}>
                                {commentInfo.createdTime[0]}년 {commentInfo.createdTime[1]}월{' '}
                                {commentInfo.createdTime[2]}일
                            </span>
                        </div>
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
                            className={'prose prose-sm max-w-full text-[0.87rem] text-black [&_code]:text-[0.87rem]'}
                            dangerouslySetInnerHTML={{ __html: dompurify.sanitize(commentInfo.content) }}
                        />
                    )}
                </div>
            </div>
        </li>
    );
}

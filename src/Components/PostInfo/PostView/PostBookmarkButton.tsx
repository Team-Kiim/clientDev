import axios from 'axios';
import { debounce } from 'lodash';
import formatNumber from '@/Utils/formatNumber.ts';
import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import useRequireLoginAlert from '@/Hooks/Alert/useRequireLoginAlert.tsx';
import useLoggedInUserData from '@/Hooks/useLoggedInUserData.ts';
import type { PostInfo } from '@/Types/PostInfo.ts';

interface Props {
    memberBookmarked: boolean;
    bookmarkCount: number;
    postId: string;
}

export default function PostBookmarkButton({ memberBookmarked, bookmarkCount, postId }: Props) {
    const queryClient = useQueryClient();

    const [previousBookmarkState, setPreviousBookmarkState] = useState(memberBookmarked);
    const [previousBookmarkCount, setPreviousBookmarkCount] = useState(bookmarkCount);

    const isLoggedIn = !!useLoggedInUserData();

    const { showRequireLoginAlert } = useRequireLoginAlert({
        message: '로그인 후 게시글을 북마크할 수 있어요.',
        from: window.location.pathname,
    });

    const { mutate } = useMutation({
        mutationFn() {
            return axios.post(`/api/post/bookmark/${postId}`);
        },

        onSuccess() {
            const { memberBookmarked: updatedBookmarkState, bookmarkCount: updatedBookmarkCount } =
                queryClient.getQueryData<PostInfo>(['post', postId]);
            setPreviousBookmarkState(updatedBookmarkState);
            setPreviousBookmarkCount(updatedBookmarkCount);
        },

        onError() {
            const postData = queryClient.getQueryData<PostInfo>(['post', postId]);
            queryClient.setQueryData(['post', postId], {
                ...postData,
                memberBookmarked: previousBookmarkState,
                bookmarkCount: previousBookmarkCount,
            });
        },

        onSettled() {
            return queryClient.invalidateQueries({ queryKey: ['post', postId] });
        },
    });

    const debouncedMutate = useCallback(debounce(mutate, 250), []);

    const handleBookmarkButtonClick = async () => {
        if (!isLoggedIn) {
            showRequireLoginAlert();
            return;
        }

        await queryClient.cancelQueries({ queryKey: ['post', postId] });

        const postData = queryClient.getQueryData<PostInfo>(['post', postId]);
        queryClient.setQueryData(['post', postId], {
            ...postData,
            memberBookmarked: !postData.memberBookmarked,
            bookmarkCount: memberBookmarked ? bookmarkCount - 1 : bookmarkCount + 1,
        });
        debouncedMutate();
    };

    return (
        <div className={'flex gap-x-1'}>
            <button className={'transition-all active:scale-95'} type={'button'} onClick={handleBookmarkButtonClick}>
                {memberBookmarked ? (
                    <BookmarkSolidIcon className={'size-6'} />
                ) : (
                    <BookmarkIcon className={'size-6 text-slate-500'} />
                )}
            </button>
            <div className={'self-center text-[0.8rem] font-bold text-slate-500'}>
                <span className={'font-bold'}>{formatNumber(bookmarkCount, 0)}</span>
            </div>
        </div>
    );
}

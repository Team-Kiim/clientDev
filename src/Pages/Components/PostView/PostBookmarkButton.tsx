import axios from 'axios';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import type { PostInfo } from '@/Types/PostInfo.ts';

interface Props {
    isBookmarked: boolean;
    postId: string;
}

export default function PostBookmarkButton({ isBookmarked, postId }: Props) {
    const queryClient = useQueryClient();

    const [previousBookmarkState, setPreviousBookmarkState] = useState(isBookmarked);

    const { mutate } = useMutation({
        mutationFn() {
            const bookmarkStateToUpdate = queryClient.getQueryData<PostInfo>(['post', postId]);
            return axios.patch('http://localhost:3001/tasks/2nRGVWLfaHWsq4VtPEsHp', {
                isBookmarked: bookmarkStateToUpdate,
            });
        },

        onSuccess() {
            const updatedBookmarkState = queryClient.getQueryData<PostInfo>(['post', postId]).isMemberBookmarked;
            setPreviousBookmarkState(updatedBookmarkState);
        },

        onError() {
            const postData = queryClient.getQueryData<PostInfo>(['post', postId]);
            queryClient.setQueryData(['post', postId], {
                ...postData,
                isBookmarked: previousBookmarkState,
            });
        },

        onSettled() {
            console.log('settled');
        },
    });

    const debouncedMutate = useCallback(debounce(mutate, 250), []);

    const handleBookmarkButtonClick = async () => {
        await queryClient.cancelQueries({ queryKey: ['post', postId] });

        const postData = queryClient.getQueryData<PostInfo>(['post', postId]);
        queryClient.setQueryData(['post', postId], {
            ...postData,
            isMemberBookmarked: !postData.isMemberBookmarked,
        });
        debouncedMutate();
    };

    return (
        <button className={'transition-all active:scale-95'} type={'button'} onClick={handleBookmarkButtonClick}>
            {isBookmarked ? (
                <BookmarkSolidIcon className={'size-6'} />
            ) : (
                <BookmarkIcon className={'size-6 text-slate-500'} />
            )}
        </button>
    );
}

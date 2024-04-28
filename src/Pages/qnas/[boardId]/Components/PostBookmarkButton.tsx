import axios from 'axios';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import type { Post } from '@/Types/PostTypes.ts';

interface Props {
    isBookmarked: boolean;
    postId: string;
}

export default function PostBookmarkButton({ isBookmarked, postId }: Props) {
    const queryClient = useQueryClient();

    const [previousBookmarkState, setPreviousBookmarkState] = useState(isBookmarked);

    const { mutate } = useMutation({
        mutationFn() {
            const bookmarkStateToUpdate = queryClient.getQueryData<Post>(['post', postId]);
            return axios.patch('http://localhost:3001/tasks/2nRGVWLfaHWsq4VtPEsHp', {
                isBookmarked: bookmarkStateToUpdate,
            });
        },

        onSuccess() {
            const updatedBookmarkState = queryClient.getQueryData<Post>(['post', postId]).isBookmarked;
            setPreviousBookmarkState(updatedBookmarkState);
        },

        onError() {
            const postData = queryClient.getQueryData<Post>(['post', postId]);
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

        const postData = queryClient.getQueryData<Post>(['post', postId]);
        queryClient.setQueryData(['post', postId], {
            ...postData,
            isBookmarked: !postData.isBookmarked,
        });
        debouncedMutate();
    };

    return (
        <div className={'tooltip tooltip-left'} data-tip={isBookmarked ? '북마크 해제' : '북마크 하기'}>
            <button
                className={`rounded-full border p-2.5 transition-all active:scale-95 ${isBookmarked ? 'border-violet-200 bg-violet-50 text-violet-600' : 'border-gray-200 bg-white text-gray-700'} shadow-md`}
                type={'button'}
                onClick={handleBookmarkButtonClick}
            >
                <BookmarkIcon className={'size-7'} />
            </button>
        </div>
    );
}

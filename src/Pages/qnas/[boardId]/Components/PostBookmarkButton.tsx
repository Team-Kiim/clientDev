import axios from 'axios';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HiBookmark, HiOutlineBookmark } from 'react-icons/hi2';
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
        <button
            className={'text-gray-700 transition-all active:scale-95'}
            type={'button'}
            onClick={handleBookmarkButtonClick}
        >
            {isBookmarked ? <HiBookmark className={'size-7'} /> : <HiOutlineBookmark className={'size-7'} />}
        </button>
    );
}

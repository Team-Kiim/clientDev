import axios from 'axios';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import formatNumber from '@/Utils/formatNumber.ts';
import type { PostInfo } from '@/Types/PostInfo.ts';

interface Props {
    isMemberLiked: boolean;
    likeCount: number;
    postId: string;
}

export default function LikeButtonWithCount({ isMemberLiked, likeCount, postId }: Props) {
    const queryClient = useQueryClient();

    const [previousLikeState, setPreviousLikeState] = useState(isMemberLiked);
    const [previousLikeCount, setPreviousLikeCount] = useState(likeCount);

    const { mutate } = useMutation({
        mutationFn() {
            const { isMemberLiked: likeStateToUpdate } = queryClient.getQueryData<PostInfo>(['post', postId]);
            return axios.post(`/api/post/${likeStateToUpdate ? 'like' : 'cancel-like'}/${postId}`);
        },

        onSuccess() {
            const { isMemberLiked: updatedLikeState, likeCount: updatedLikeCount } = queryClient.getQueryData<PostInfo>(
                ['post', postId],
            );

            setPreviousLikeState(updatedLikeState);
            setPreviousLikeCount(updatedLikeCount);
        },

        onError() {
            const postData = queryClient.getQueryData<PostInfo>(['post', postId]);
            queryClient.setQueryData(['post', postId], {
                ...postData,
                isMemberLiked: previousLikeState,
                likeCount: previousLikeCount,
            });
        },

        onSettled() {
            console.log('settled');
        },
    });

    const debouncedMutate = useCallback(debounce(mutate, 250), []);

    const handleLikeButtonClick = async () => {
        await queryClient.cancelQueries({ queryKey: ['post', postId] });

        const postData = queryClient.getQueryData<PostInfo>(['post', postId]);
        queryClient.setQueryData(['post', postId], {
            ...postData,
            isMemberLiked: !postData.isMemberLiked,
            likeCount: isMemberLiked ? likeCount - 1 : likeCount + 1,
        });

        debouncedMutate();
    };

    return (
        <div className={'flex items-center gap-x-2'}>
            <div className={'text-[0.9rem] text-gray-600'}>
                {'좋아요 '}
                <span className={'font-bold'}>{formatNumber(likeCount, 0)}</span>
            </div>
            <button
                className={'text-gray-700 transition-all active:scale-95'}
                type={'button'}
                onClick={handleLikeButtonClick}
            >
                {isMemberLiked ? <BiSolidLike className={'size-7'} /> : <BiLike className={'size-7'} />}
            </button>
        </div>
    );
}

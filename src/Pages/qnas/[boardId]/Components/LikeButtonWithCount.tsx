import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BiLike } from 'react-icons/bi';
import type { Post } from '@/Types/PostTypes.ts';
import formatNumber from '@/Utils/formatNumber.ts';

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
            const { isMemberLiked: likeStateToUpdate, likeCount: likeCountToUpdate } = queryClient.getQueryData<Post>([
                'post',
                postId,
            ]);
            console.log(likeStateToUpdate, likeCountToUpdate);
            return Promise.resolve(true);
        },

        onSuccess() {
            const { isMemberLiked: updatedLikeState, likeCount: updatedLikeCount } = queryClient.getQueryData<Post>([
                'post',
                postId,
            ]);

            setPreviousLikeState(updatedLikeState);
            setPreviousLikeCount(updatedLikeCount);
        },

        onError() {
            const postData = queryClient.getQueryData<Post>(['post', postId]);
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

        const postData = queryClient.getQueryData<Post>(['post', postId]);
        queryClient.setQueryData(['post', postId], {
            ...postData,
            isMemberLiked: !postData.isMemberLiked,
            likeCount: isMemberLiked ? likeCount - 1 : likeCount + 1,
        });

        debouncedMutate();
    };

    return (
        <div className={'flex flex-col items-center gap-y-2'}>
            <div className={'tooltip tooltip-left'} data-tip={isMemberLiked ? '좋아요 취소' : '좋아요'}>
                <button
                    className={`rounded-full border p-2.5 transition-all active:scale-95 ${isMemberLiked ? 'border-blue-200 bg-blue-50 text-blue-600' : 'border-gray-200 bg-white text-gray-700'} shadow-md`}
                    type={'button'}
                    onClick={handleLikeButtonClick}
                >
                    <BiLike className={'size-9'} />
                </button>
            </div>
            <span className={'text-[0.95rem] font-medium text-gray-500'}>{formatNumber(likeCount, 0)}</span>
        </div>
    );
}

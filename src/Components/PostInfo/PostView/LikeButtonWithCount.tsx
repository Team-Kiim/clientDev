import axios from 'axios';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HeartIcon } from '@heroicons/react/24/outline';
import useRequireLoginAlert from '@/Hooks/Alert/useRequireLoginAlert.tsx';
import useAuth from '@/Hooks/Auth/useAuth.tsx';
import formatNumber from '@/Utils/formatNumber.ts';
import type { PostInfo } from '@/Types/PostInfo.ts';

interface Props {
    memberLiked: boolean;
    likeCount: number;
    postId: string;
}

export default function LikeButtonWithCount({ memberLiked, likeCount, postId }: Props) {
    const queryClient = useQueryClient();

    const { user } = useAuth();

    const { showRequireLoginAlert } = useRequireLoginAlert({
        message: '로그인 후 게시글에 좋아요할 수 있어요.',
        from: window.location.pathname,
    });

    const [previousLikeState, setPreviousLikeState] = useState(memberLiked);
    const [previousLikeCount, setPreviousLikeCount] = useState(likeCount);

    const { mutate } = useMutation({
        mutationFn() {
            return axios.post(`/api/post/like/${postId}`);
        },

        onSuccess() {
            const { memberLiked: updatedLikeState, likeCount: updatedLikeCount } = queryClient.getQueryData<PostInfo>([
                'post',
                postId,
            ]);

            setPreviousLikeState(updatedLikeState);
            setPreviousLikeCount(updatedLikeCount);
        },

        onError() {
            const postData = queryClient.getQueryData<PostInfo>(['post', postId]);
            queryClient.setQueryData(['post', postId], {
                ...postData,
                memberLiked: previousLikeState,
                likeCount: previousLikeCount,
            });
        },
    });

    const debouncedMutate = useCallback(debounce(mutate, 250), []);

    const handleLikeButtonClick = async () => {
        if (!user) {
            showRequireLoginAlert();
            return;
        }

        await queryClient.cancelQueries({ queryKey: ['post', postId] });

        const postData = queryClient.getQueryData<PostInfo>(['post', postId]);
        queryClient.setQueryData(['post', postId], {
            ...postData,
            memberLiked: !postData.memberLiked,
            likeCount: memberLiked ? likeCount - 1 : likeCount + 1,
        });

        debouncedMutate();
    };

    return (
        <div className={'flex gap-x-1'}>
            <button className={'transition-all active:scale-95'} type={'button'} onClick={handleLikeButtonClick}>
                {memberLiked ? (
                    <HeartIcon className={'size-6 text-rose-500 '} />
                ) : (
                    <HeartIcon className={'size-6 text-slate-500'} />
                )}
            </button>
            <div className={'self-center text-[0.8rem] font-bold text-slate-500'}>
                <span className={'font-bold'}>{formatNumber(likeCount, 0)}</span>
            </div>
        </div>
    );
}

import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TOAST_OPTIONS from '@/Constants/toastOptions.ts';
import type { SocialMediaUser } from '@/Types/SocialMediaUser.ts';

export const useUnfollowMember = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn(memberId: number) {
            return axios.post(`/api/member-follow/${memberId}`);
        },

        onMutate: async (memberId: number) => {
            await queryClient.cancelQueries({
                queryKey: ['social', 'following'],
            });

            const previousFollowingList = queryClient
                .getQueryData<{ pages: SocialMediaUser[]; pageParam: number }>(['social', 'following'])
                .pages.flat();

            queryClient.setQueryData<{ pages: SocialMediaUser[][]; pageParam: number }>(
                ['social', 'following'],
                oldData => {
                    return {
                        ...oldData,
                        pages: [
                            previousFollowingList.filter(followingListItem => followingListItem.memberId !== memberId),
                        ],
                    };
                },
            );

            return { previousFollowingList };
        },

        onError: (error, _, context) => {
            console.error(error);
            toast.error(
                <p className={'text-[0.85rem] leading-relaxed'}>
                    언팔로우 할 수 없습니다. <br />
                    잠시 후 다시 시도해주세요.
                </p>,
                TOAST_OPTIONS,
            );

            queryClient.setQueryData<{ pages: SocialMediaUser[][]; pageParam: number }>(
                ['social', 'following'],
                oldData => {
                    return {
                        ...oldData,
                        pages: [context.previousFollowingList],
                    };
                },
            );
        },

        onSettled: () => {
            return queryClient.invalidateQueries({
                queryKey: ['social', 'following'],
            });
        },
    });
};

import axios from 'axios';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@/Types/User.ts';

interface Props {
    profileMemberId: string;
    isFollowingMember: boolean;
}

export default function FollowToggleButton({ profileMemberId, isFollowingMember }: Props) {
    const queryClient = useQueryClient();

    const [previousFollowState, setPreviousFollowState] = useState(isFollowingMember);

    const { mutate: mutateFollowState } = useMutation({
        mutationFn() {
            return axios.post(`/api/member-follow/${profileMemberId}`);
        },

        onSuccess() {
            const { isFollowingMember: updatedFollowState } = queryClient.getQueryData<User>(['user', profileMemberId]);
            setPreviousFollowState(updatedFollowState);
        },

        onError() {
            queryClient.setQueryData<User>(['user', profileMemberId], oldUserData => {
                return {
                    ...oldUserData,
                    isFollowingMember: previousFollowState,
                };
            });
        },

        onSettled() {
            return queryClient.invalidateQueries({ queryKey: ['user', profileMemberId] });
        },
    });

    const debouncedMutateFollowState = useCallback(debounce(mutateFollowState, 250), []);

    const followStateToggle = async () => {
        await queryClient.cancelQueries({
            queryKey: ['user', profileMemberId],
        });

        queryClient.setQueryData<User>(['user', profileMemberId], oldUserData => {
            return {
                ...oldUserData,
                isFollowingMember: !oldUserData.isFollowingMember,
            };
        });

        debouncedMutateFollowState();
    };

    return (
        <div className={'flex justify-end'}>
            <button
                className={`rounded-3xl bg-gradient-to-r from-plump-purple-600 to-rose-500 px-4 py-2.5 text-[0.85rem] font-extrabold text-white`}
                type={'button'}
                onClick={() => {
                    followStateToggle();
                }}
            >
                {isFollowingMember ? '팔로잉' : '팔로우'}
            </button>
        </div>
    );
}

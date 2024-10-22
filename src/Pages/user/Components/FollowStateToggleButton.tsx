import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HiOutlineExclamationCircle, HiOutlineQuestionMarkCircle } from 'react-icons/hi2';
import { toast } from 'react-toastify';
import { User } from '@/Types/User.ts';
import ALERT_STYLE from '@/Constants/alertStyle.ts';
import TOAST_OPTIONS from '@/Constants/toastOptions.ts';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    isFollowingMember: boolean;
    profileMemberId: string;
    userNickname: string;
}

export default function FollowStateToggleButton({ profileMemberId, isFollowingMember, userNickname }: Props) {
    const queryClient = useQueryClient();

    const { mutate: toggleFollowState } = useMutation({
        mutationFn: () => axios.post(`/api/member-follow/${profileMemberId}`),

        onMutate: async () => {
            await queryClient.cancelQueries({
                queryKey: ['user', profileMemberId],
            });

            const previousFollowState = queryClient.getQueryData<User>(['user', profileMemberId]).isFollowingMember;

            queryClient.setQueryData<User>(['user', profileMemberId], oldData => ({
                ...oldData,
                isFollowingMember: !oldData.isFollowingMember,
            }));

            return { previousFollowState };
        },

        onError: (_, __, context) => {
            toast.error(
                <p className={'text-[0.85rem] leading-relaxed'}>
                    현재 {isFollowingMember ? '언팔로우' : '팔로우'}를 할 수 없습니다.
                    <br />
                    잠시 후 다시 시도해주세요.
                </p>,
                TOAST_OPTIONS,
            );
            queryClient.setQueryData<User>(['user', profileMemberId], oldData => ({
                ...oldData,
                isFollowingMember: context.previousFollowState,
            }));
        },

        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['user', profileMemberId],
            });
        },
    });

    const handleFollowToggleButtonClick = () => {
        withReactContent(Swal)
            .fire({
                html: (
                    <p className={'text-sm leading-relaxed text-slate-500'}>
                        {isFollowingMember
                            ? `정말 ${userNickname}님을 언팔로우 하시겠습니까?`
                            : `${userNickname}님을 팔로우 할까요?`}
                    </p>
                ),
                title: (
                    <div className={'flex items-center gap-x-2'}>
                        {isFollowingMember ? (
                            <HiOutlineExclamationCircle className={'size-6 text-amber-500'} />
                        ) : (
                            <HiOutlineQuestionMarkCircle className={'size-6 text-cyan-500'} />
                        )}
                        <h1 className={'font-bold'}>{isFollowingMember ? '언팔로우' : '팔로우'}</h1>
                    </div>
                ),
                showCancelButton: true,
                confirmButtonText: '확인',
                cancelButtonText: '취소',
                customClass: ALERT_STYLE,
            })
            .then(async result => {
                if (result.isConfirmed) {
                    toggleFollowState();
                }
            });
    };

    return (
        <button
            className={
                'flex items-center justify-center gap-x-2 rounded-2xl bg-slate-800 px-4 py-2 transition-all enabled:active:scale-90 disabled:opacity-75'
            }
            type={'button'}
            onClick={handleFollowToggleButtonClick}
        >
            <span className={'text-sm font-bold text-white'}>{isFollowingMember ? '언팔로우' : '팔로우'}</span>
        </button>
    );
}

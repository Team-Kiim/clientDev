import ky from 'ky';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TOAST_OPTIONS from '@/Constants/toastOptions.ts';

export default function useUpdateProfileMutation() {
    const queryClient = useQueryClient();

    const { mutate: updateProfile } = useMutation({
        mutationFn: ({ nickname, memberRole }: { nickname: string; memberRole: string }) =>
            ky.patch('/api/member/profile', {
                json: {
                    nickname,
                    memberRole,
                },
            }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['user'],
            });
        },

        onError: () => {
            toast.error(
                <p className={'text-[0.85rem] leading-relaxed'}>
                    프로필 정보를 변경할 수 없습니다. <br />
                    잠시 후 다시 시도해주세요.
                </p>,
                {
                    ...TOAST_OPTIONS,
                    position: 'top-center',
                },
            );
        },
    });

    const { mutate: updateProfileImage } = useMutation({
        mutationFn: ({ imageFile }: { imageFile: File }) => {
            const formData = new FormData();

            formData.append('file', imageFile);

            return ky.post('/api/member/enroll-profile-image/s3', {
                body: formData,
            });
        },

        onSuccess: () => {
            return Promise.all([
                queryClient.invalidateQueries({ queryKey: ['user'] }),
                queryClient.invalidateQueries({ queryKey: ['loggedIn user'] }),
            ]);
        },

        onError: () => {
            toast.error(
                <p className={'text-[0.85rem] leading-relaxed'}>
                    프로필 사진 변경에 실패했습니다. <br />
                    잠시 후 다시 시도해주세요.
                </p>,
                TOAST_OPTIONS,
            );
        },
    });

    return {
        updateProfile,
        updateProfileImage,
    };
}

import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TOAST_OPTIONS from '@/Constants/toastOptions.ts';

export default function useCreateSkillChatRoomMutation() {
    return useMutation({
        mutationFn: ({
            parentSkillCategory,
            childSkillCategory,
        }: {
            parentSkillCategory: string;
            childSkillCategory: string;
        }) =>
            axios.post('/api/tech-chat-room/', {
                parentSkillCategory,
                childSkillCategory,
            }),

        onSuccess: () => {
            toast.success(
                <p className={'text-[0.85rem] leading-relaxed'}>기술 채팅방이 정상적으로 생성되었습니다.</p>,
                TOAST_OPTIONS,
            );
        },

        onError: () => {
            toast.error(
                <p className={'text-[0.85rem] leading-relaxed'}>
                    기술 채팅방을 생성할 수 없습니다. 잠시 후 다시 시도해주세요.
                </p>,
                TOAST_OPTIONS,
            );
        },
    });
}

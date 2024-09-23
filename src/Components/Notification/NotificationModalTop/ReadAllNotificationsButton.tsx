import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import TOAST_OPTIONS from '@/Constants/toastOptions.ts';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    isButtonDisabled: boolean;
}

export default function ReadAllNotificationsButton({ isButtonDisabled }: Props) {
    const queryClient = useQueryClient();

    const handleReadAllNotificationsButtonClick = async () => {
        try {
            await axios.patch('/api/notifications');
            queryClient
                .invalidateQueries({
                    queryKey: ['user', 'notifications'],
                })
                .catch();
        } catch {
            toast.error(
                <p className={'text-[0.85rem] leading-relaxed'}>
                    모두 읽기에 실패하였습니다. <br />
                    잠시 후 다시 시도해주세요.
                </p>,
                TOAST_OPTIONS,
            );
        }
    };

    return (
        <button
            className={'rounded-lg px-2 py-1 text-[0.75rem] font-bold enabled:hover:bg-slate-100 disabled:opacity-50'}
            onClick={handleReadAllNotificationsButtonClick}
            type={'button'}
            disabled={isButtonDisabled}
        >
            모두 읽음
        </button>
    );
}

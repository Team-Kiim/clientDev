import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

const useLeaveTheChat = ({
    successCallback,
    errorCallback,
}: {
    successCallback?: (...args: any[]) => any;
    errorCallback?: (...args: any[]) => any;
}) => {
    return useMutation({
        mutationFn: ({ chatRoomId }: { chatRoomId: string }) => axios.patch(`/api/direct-chat-room/exit/${chatRoomId}`),

        onSuccess: () => {
            if (successCallback) {
                successCallback();
            }
        },

        onError: () => {
            if (errorCallback) {
                errorCallback();
            }
        },
    });
};

export default useLeaveTheChat;

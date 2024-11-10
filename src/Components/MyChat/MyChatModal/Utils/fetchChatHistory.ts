import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';
import type { Chat } from '@/Types/chat.ts';

type QueryKey = [_1: string, _2: string];

const fetchChatHistory: QueryFunction<Chat[], QueryKey, number> = ({ queryKey, pageParam }) => {
    const chatRoomId = queryKey[1];

    return axios
        .get(`/api/chat-room/message/${chatRoomId}?size=16${pageParam === -1 ? '' : `&cursor=${pageParam}`}`)
        .then(response => {
            return response.data;
        });
};

export default fetchChatHistory;

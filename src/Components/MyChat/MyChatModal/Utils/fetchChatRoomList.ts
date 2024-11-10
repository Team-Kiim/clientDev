import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';
import type ChatRoom from '@/Types/chatRoom.ts';

type QueryKey = [_1: string, _2: string, _3: { filter: string }];

const fetchChatRoomList: QueryFunction<ChatRoom[], QueryKey, number> = ({ queryKey, pageParam }) => {
    const { filter } = queryKey[2];

    return axios
        .get(
            `/api/${filter === 'oneOnOne' ? 'direct-chat-room' : 'tech-chat-room/join-list'}?page=${pageParam}&size=16`,
        )
        .then(response => response.data);
};

export default fetchChatRoomList;

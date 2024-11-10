import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';
import type SkillChatRoom from '@/Types/skillChatRoom.ts';

type QueryKey = [_1: string, _2: string, _3: { category: string }];

const fetchSkillChatRoomList: QueryFunction<SkillChatRoom[], QueryKey, number> = ({ queryKey }) => {
    const { category } = queryKey[2];

    return axios.get(`/api/tech-chat-room/list?parentSkillCategory=${category}`).then(response => response.data);
};

export default fetchSkillChatRoomList;

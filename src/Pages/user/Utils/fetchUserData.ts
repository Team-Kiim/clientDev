import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';
import type { User } from '@/Types/User.ts';

type QueryKey = [_1: string, _2?: string];

const fetchUserData: QueryFunction<User, QueryKey> = ({ queryKey }) => {
    const memberId = queryKey[1];

    return axios.get(`/api/member/profile${memberId ? `/${memberId}` : ''}`).then(response => response.data);
};

export default fetchUserData;

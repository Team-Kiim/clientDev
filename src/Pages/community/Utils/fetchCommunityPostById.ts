import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';
import type { CommunityPostInfo } from '@/Types/PostInfo.ts';

type QueryKey = [_1: string, _2: string];

const fetchCommunityPostById: QueryFunction<CommunityPostInfo, QueryKey> = ({ queryKey }) => {
    const postId = queryKey[1];

    return axios.get(`/api/community-post/${postId}`).then(response => response.data);
};

export default fetchCommunityPostById;

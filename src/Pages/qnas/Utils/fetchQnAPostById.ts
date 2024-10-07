import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';
import type { QnAPostInfo } from '@/Types/PostInfo.ts';

type QueryKey = [_1: string, _2: string];

const fetchQnAPostById: QueryFunction<QnAPostInfo, QueryKey> = ({ queryKey }) => {
    const postId = queryKey[1];

    return axios.get(`/api/dev-post/${postId}`).then(response => response.data);
};

export default fetchQnAPostById;

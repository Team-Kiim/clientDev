import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';
import type { Post } from '@/Types/Post.ts';

const fetchUserActivityPostList: QueryFunction<
    Post[],
    [_1: string, _2: string, _3: { title: string; activity: string; postType: string; postSort: string }],
    number
> = ({ queryKey, pageParam }) => {
    const { title, activity, postType, postSort } = queryKey[2];

    if (activity === 'bookmark') {
        return axios
            .get(
                `/api/post/bookmark/${postType === 'qnas' ? 'DEV' : 'COMMUNITY'}/${postSort === 'latest' ? 'NEW' : postSort.toUpperCase()}?page=${pageParam}&size=16${title === null ? '' : `&word=${title}`}`,
            )
            .then(response => response.data);
    } else {
        return axios
            .get(
                `/api/post/${postType === 'qnas' ? 'DEV' : 'COMMUNITY'}/${postSort === 'latest' ? 'NEW' : postSort.toUpperCase()}?page=${pageParam}&size=16${title === null ? '' : `&word=${title}`}`,
            )
            .then(response => response.data);
    }
};

export default fetchUserActivityPostList;

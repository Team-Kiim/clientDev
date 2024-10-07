import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';
import type { Post } from '@/Types/Post.ts';

type QueryKey = [_1: string, _2: string, _3: { title: string; hashTags: string[]; sort: string }];

const fetchCommunityPostList: QueryFunction<Post[], QueryKey, number> = ({ queryKey, pageParam }) => {
    const { title, sort, hashTags } = queryKey[2];

    const hashTagsQueryString = hashTags.map(hashTag => `&tag=${hashTag}`).join('');

    return axios
        .get(
            `/api/community-post?page=${pageParam}&size=16&sortType=${sort === 'latest' ? 'NEW' : sort.toUpperCase()}${hashTagsQueryString}${title === null ? '' : `&word=${title}`}`,
        )
        .then(response => response.data);
};

export default fetchCommunityPostList;

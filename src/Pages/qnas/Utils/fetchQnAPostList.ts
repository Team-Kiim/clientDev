import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';
import type { Post } from '@/Types/Post.ts';

type QueryKey = [_1: string, _2: string, _3: { title: string; categories: string[]; hashTags: string[]; sort: string }];

const fetchQnAPostList: QueryFunction<Post[], QueryKey, number> = ({ queryKey, pageParam }) => {
    const { title, categories, hashTags, sort } = queryKey[2];

    const categoriesQueryString = categories.map(category => `&skillCategory=${category}`).join('');

    const hashTagsQueryString = hashTags.map(hashTag => `&tag=${hashTag}`).join('');

    return axios
        .get(
            `/api/dev-post?page=${pageParam}&size=16&sortType=${sort === 'latest' ? 'NEW' : sort.toUpperCase()}${categoriesQueryString}${hashTagsQueryString}${title === null ? '' : `&word=${title}`}`,
        )
        .then(response => response.data);
};

export default fetchQnAPostList;

import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';
import type SkillPost from '@/Types/skillPost.ts';

type QueryKey = [_1: string, _2: string, _3: { category: string }];

const fetchSKillPostList: QueryFunction<SkillPost[], QueryKey, string> = ({ queryKey, pageParam }) => {
    const { category } = queryKey[2];

    return axios
        .get(`/api/dev-post/skill?${pageParam === '' ? '' : `cursor=${pageParam}`}&size=16&skillCategory=${category}`)
        .then(response => response.data);
};

export default fetchSKillPostList;

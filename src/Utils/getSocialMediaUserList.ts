import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';
import type { SocialMediaUser } from '@/Types/SocialMediaUser.ts';

const getSocialMediaUserList: QueryFunction<SocialMediaUser[], [_1: string, _2: string], number> = ({
    queryKey,
    pageParam,
}) => {
    const relationshipType = queryKey[1];
    return axios
        .get(
            `/api/member-follow/${relationshipType === 'follower' ? 'follower-list' : 'following-list'}?page=${pageParam}&size=16`,
        )
        .then(response => response.data);
};

export default getSocialMediaUserList;

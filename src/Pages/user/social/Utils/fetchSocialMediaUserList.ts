import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';
import type { SocialMediaUser } from '@/Types/SocialMediaUser.ts';

type QueryKey = [_1: string, _2: string, _3: { relationshipType: string; keyword?: string; memberId?: number }];

const fetchSocialMediaUserList: QueryFunction<SocialMediaUser[], QueryKey, number> = ({ queryKey, pageParam }) => {
    const { relationshipType, keyword, memberId } = queryKey[2];

    if (keyword) {
        return axios
            .get(
                `/api/member-follow/${relationshipType}${memberId ? `/${memberId}` : ''}/search?page=${pageParam}&size=16&keyword=${keyword}`,
            )
            .then(response => response.data);
    } else {
        return axios
            .get(`/api/member-follow/${relationshipType}${memberId ? `/${memberId}` : ''}?page=${pageParam}&size=16`)
            .then(response => response.data);
    }
};

export default fetchSocialMediaUserList;

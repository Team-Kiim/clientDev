import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import fetchSocialMediaUserList from '@/Pages/user/social/Utils/fetchSocialMediaUserList.ts';

const useSocialMediaUserListQuery = ({
    relationshipType,
    keyword,
    memberId,
}: {
    relationshipType: string;
    keyword: string;
    memberId: number | null;
}) => {
    return useSuspenseInfiniteQuery({
        queryKey: ['user', 'social', { relationshipType, keyword, memberId }],
        queryFn: fetchSocialMediaUserList,
        initialPageParam: 0,
        getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.length < 16 ? undefined : lastPageParam + 1),
    });
};

export default useSocialMediaUserListQuery;

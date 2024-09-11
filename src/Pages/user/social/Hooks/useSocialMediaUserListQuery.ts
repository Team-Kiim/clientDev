import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import fetchSocialMediaUserList from '@/Utils/fetchSocialMediaUserList.ts';

const useSocialMediaUserListQuery = ({ socialType }: { socialType: string }) => {
    return useSuspenseInfiniteQuery({
        queryKey: ['social', socialType],
        queryFn: fetchSocialMediaUserList,
        initialPageParam: 0,
        getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.length < 16 ? undefined : lastPageParam + 1),
    });
};

export default useSocialMediaUserListQuery;

import { useSearchParams } from 'react-router-dom';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostListItem from '@/Components/Post/PostListItem.tsx';
import NoPostMessage from '@/Components/Post/NoPostMessage.tsx';
import fetchCommunityPostList from '@/Pages/community/Utils/fetchCommunityPostList.ts';
import getCurrentPostSortFilter from '@/Utils/getCurrentPostSortFilter.ts';

export default function CommunityPostList() {
    const [searchParams] = useSearchParams();

    const postTitle = searchParams.get('search');

    const sortFilterValue = getCurrentPostSortFilter(searchParams).value;

    const hashTags = searchParams.getAll('tag') ?? [];

    const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery({
        queryKey: ['posts', 'community', { title: postTitle, sort: sortFilterValue, hashTags }],
        queryFn: fetchCommunityPostList,
        initialPageParam: 0,
        getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.length < 16 ? undefined : lastPageParam + 1),
    });

    const communityPostList = data.pages.flat();

    return (
        <>
            {communityPostList.length === 0 ? (
                <NoPostMessage />
            ) : (
                <InfiniteScroll
                    next={fetchNextPage}
                    hasMore={hasNextPage}
                    loader={null}
                    dataLength={communityPostList.length}
                    scrollThreshold={0.9}
                    className={'px-6 pb-10 pt-3'}
                >
                    <ul className={'grid grid-cols-4 gap-x-4 gap-y-10'}>
                        {communityPostList.map(communityPost => (
                            <PostListItem key={communityPost.id} post={communityPost} postType={'community'} />
                        ))}
                    </ul>
                </InfiniteScroll>
            )}
        </>
    );
}

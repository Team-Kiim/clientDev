import { useSearchParams } from 'react-router-dom';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserActivityPostListItem from '@/Pages/user/posts/Components/UserActivityPostListItem.tsx';
import getPostList from '@/Pages/user/posts/Utils/getPostList.ts';

const activityFilters = [
    { value: 'write', label: '작성한' },
    { value: 'like', label: '좋아요 한' },
    { value: 'bookmark', label: '북마크 한' },
    { value: 'comment', label: '댓글 단' },
];

export default function UserActivityPostList() {
    const [searchParams] = useSearchParams();

    const activity = searchParams.get('activity') ?? 'write';
    const postType = searchParams.get('post-type') ?? 'qnas';
    const postSort = searchParams.get('post-sort') ?? 'latest';

    const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery({
        queryKey: [
            'user',
            'post',
            {
                activity,
                postType,
                postSort,
            },
        ],
        queryFn: getPostList,
        initialPageParam: 0,
        getNextPageParam(lastPage, allPages) {
            if (lastPage.length < 16) {
                return undefined;
            }
            return allPages.length;
        },
    });

    const userActivityPostList = data.pages.flat();

    return (
        <>
            {userActivityPostList.length !== 0 ? (
                <InfiniteScroll
                    next={fetchNextPage}
                    hasMore={hasNextPage}
                    loader={null}
                    dataLength={userActivityPostList.length}
                    scrollThreshold={0.9}
                    className={'pt-3'}
                >
                    <ul className={'grid w-full grid-cols-3 gap-4'}>
                        {userActivityPostList.map(userActivityPost => (
                            <UserActivityPostListItem post={userActivityPost} postType={postType} />
                        ))}
                    </ul>
                </InfiniteScroll>
            ) : (
                <div className={'my-16'}>
                    <p className={'text-center text-[0.85rem] font-bold text-slate-400'}>
                        {activityFilters.find(activityFilter => activityFilter.value === activity).label} 게시글이
                        존재하지 않습니다.
                    </p>
                </div>
            )}
        </>
    );
}

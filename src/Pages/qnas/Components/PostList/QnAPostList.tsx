import { useSearchParams } from 'react-router-dom';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostListItem from '@/Components/Post/PostListItem.tsx';
import fetchQnAPostList from '@/Pages/qnas/Utils/fetchQnAPostList.ts';
import getCurrentPostSortFilter from '@/Utils/getCurrentPostSortFilter.ts';

export default function QnAPostList() {
    const [searchParams] = useSearchParams();

    const postTitle = searchParams.get('search');

    const categories = searchParams.getAll('category') ?? [];

    const hashTags = searchParams.getAll('tag') ?? [];

    const sortFilterValue = getCurrentPostSortFilter(searchParams).value;

    const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery({
        queryKey: ['posts', 'qnas', { title: postTitle, categories, hashTags, sort: sortFilterValue }],
        queryFn: fetchQnAPostList,
        initialPageParam: 0,
        getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.length < 16 ? undefined : lastPageParam + 1),
        refetchOnMount: true,
    });

    const qnaPostList = data.pages.flat();

    return (
        <>
            {qnaPostList.length === 0 ? (
                <p>게시글 없음.</p>
            ) : (
                <InfiniteScroll
                    next={fetchNextPage}
                    hasMore={hasNextPage}
                    loader={null}
                    dataLength={qnaPostList.length}
                    scrollThreshold={0.9}
                    className={'px-6 pb-10 pt-3'}
                >
                    <ul className={'grid grid-cols-4 gap-x-4 gap-y-10'}>
                        {qnaPostList.map(qnaPost => (
                            <PostListItem key={qnaPost.id} post={qnaPost} postType={'qnas'} />
                        ))}
                    </ul>
                </InfiniteScroll>
            )}
        </>
    );
}

import { useLocation, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import NoPostsMessage from '@/Components/Post/NoPostsMessage.tsx';
import PostListItem from '@/Components/Post/PostListItem.tsx';
import PostListPagination from '@/Components/Post/PostListPagination.tsx';
import getPostList from '@/Utils/getPostList.ts';

export default function PostList() {
    const [searchParams] = useSearchParams();

    const { pathname } = useLocation();

    const postType = pathname.split('/')[1] || 'qnas';
    const title = searchParams.get('post_title') ?? '';
    const categories = searchParams.getAll('category') ?? [];
    const currentPage = Number(searchParams.get('page') ?? '1');

    const {
        data: postList,
        isLoading,
        isPending,
    } = useQuery({
        queryKey: ['posts', { postType, title, categories, currentPage }],
        queryFn: getPostList,
        gcTime: 0,
        throwOnError: true,
    });

    if (isLoading || isPending) {
        return <div>로딩</div>;
    }

    return (
        <>
            {postList.length === 0 ? (
                <NoPostsMessage />
            ) : (
                <>
                    <ul className={'grid grid-cols-4 gap-x-3.5 gap-y-5'}>
                        {postList.map(post => {
                            return (
                                <PostListItem
                                    key={post.id}
                                    post={post}
                                    postType={postType === '' ? 'qnas' : postType}
                                />
                            );
                        })}
                    </ul>
                    <div className={'my-10'}>
                        <PostListPagination numberOfPosts={postList.length} />
                    </div>
                </>
            )}
        </>
    );
}

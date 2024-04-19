import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import PostListItem from '@/Components/Post/PostListItem.tsx';
import getPostList from '@/Utils/getPostList.ts';

export default function PostList() {
    const [searchParams] = useSearchParams();

    const qnaType = searchParams.get('qna_type') ?? 'dev';
    const title = searchParams.get('post_title') ?? '';
    const keywords = searchParams.getAll('keyword') ?? [];

    const {
        data: postList,
        isLoading,
        isPending,
    } = useQuery({
        queryKey: ['post', { qnaType, title, keywords }],
        queryFn: getPostList,
        gcTime: 0,
        throwOnError: true,
    });

    if (isLoading || isPending) {
        return <div>로딩</div>;
    }

    return (
        <div className={'grid grid-cols-4 gap-x-3.5 gap-y-4'}>
            {postList.map(post => {
                return <PostListItem key={post.id} post={post} />;
            })}
        </div>
    );
}

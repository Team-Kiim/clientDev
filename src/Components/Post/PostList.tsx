import { useSearchParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import PostListItem from '@/Components/Post/PostListItem.tsx';
import getPostList from '@/Utils/getPostList.ts';

export default function PostList() {
    const [searchParams] = useSearchParams();

    const postType = searchParams.get('post_type') ?? 'develop';
    const title = searchParams.get('post_title') ?? '';
    const keyword = searchParams.get('keyword') ?? '';

    const { data: postList } = useSuspenseQuery({
        queryKey: ['post', { postType, title, keyword }],
        queryFn: getPostList,
    });

    return (
        <div className={'grid grid-cols-4 gap-x-3.5 gap-y-4'}>
            {postList.map(post => {
                return <PostListItem key={post.id} post={post} />;
            })}
        </div>
    );
}

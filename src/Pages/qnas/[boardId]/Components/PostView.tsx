import { omit, pick } from 'lodash';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import PostDetails from '@/Pages/qnas/[boardId]/Components/PostDetails.tsx';
import PostInteraction from '@/Pages/qnas/[boardId]/Components/PostInteraction.tsx';
import getSinglePostData from '@/Pages/qnas/[boardId]/Utils/getSinglePostData.ts';

export default function PostView() {
    const postId = useParams().postId;

    const { data } = useSuspenseQuery({
        queryKey: ['post', postId],
        queryFn: getSinglePostData,
    });

    return (
        <div className={'relative col-span-7'}>
            <PostInteraction {...pick(data, ['isMemberLiked', 'likeCount', 'isBookmarked'])} postId={postId} />
            <PostDetails {...omit(data, ['isBookmarked', 'likeCount'])} />
        </div>
    );
}

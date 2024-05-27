import { omit, pick } from 'lodash';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import PostDetails from '@/Pages/Components/PostView/PostDetails.tsx';
import PostInteraction from '@/Pages/Components/PostView/PostInteraction.tsx';
import getSingleQnAPostInfo from '@/Pages/qnas/Utils/getSingleQnAPostInfo.ts';

export default function PostView() {
    const postId = useParams().postId;

    const { data } = useSuspenseQuery({
        queryKey: ['post', postId],
        queryFn: getSingleQnAPostInfo,
    });

    return (
        <div className={'col-span-7'}>
            <PostDetails {...omit(data, ['isBookmarked', 'likeCount'])} />
            <PostInteraction {...pick(data, ['isMemberLiked', 'likeCount', 'isMemberBookmarked'])} postId={postId} />
        </div>
    );
}

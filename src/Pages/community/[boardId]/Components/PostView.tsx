import { omit, pick } from 'lodash';
import { useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import PostDetails from '@/Pages/community/[boardId]/Components/PostDetails.tsx';
import PostInteraction from '@/Pages/Components/PostView/PostInteraction.tsx';
import CommentForm from '@/Pages/community/[boardId]/Components/Comment/CommentForm.tsx';
import CommentList from '@/Pages/community/[boardId]/Components/Comment/CommentList.tsx';
import getSingleCommunityPostInfo from '@/Pages/community/Utils/getSingleCommunityPostInfo.ts';

export default function PostView() {
    const postId = useParams().postId;

    const { data } = useSuspenseQuery({
        queryKey: ['post', postId],
        queryFn: getSingleCommunityPostInfo,
    });

    return (
        <div className={'col-span-7 col-start-2'}>
            <PostDetails
                {...omit(data, [
                    'likeCount',
                    'isMemberLiked',
                    'isMemberBookmarked',
                    'imageFileInfoDtoList',
                    'commentInfoDtoList',
                ])}
            />
            <PostInteraction {...pick(data, ['isMemberLiked', 'likeCount', 'isMemberBookmarked'])} postId={postId} />
            <div className={'my-5'}>
                <CommentForm />
                <CommentList commentInfoDtoList={data.commentInfoDtoList} />
            </div>
        </div>
    );
}

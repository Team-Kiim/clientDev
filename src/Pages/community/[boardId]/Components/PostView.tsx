import { omit, pick } from 'lodash';
import { useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import PostDetails from '@/Pages/community/[boardId]/Components/PostDetails.tsx';
import PostInteraction from '@/Pages/Components/PostView/PostInteraction.tsx';
import CommentWriteForm from '@/Pages/community/[boardId]/Components/Comment/CommentWriteForm.tsx';
import CommentList from '@/Pages/community/[boardId]/Components/Comment/CommentList.tsx';
import getSingleCommunityPostInfo from '@/Pages/community/Utils/getSingleCommunityPostInfo.ts';

export default function PostView() {
    const postId = useParams().postId;

    const { data } = useSuspenseQuery({
        queryKey: ['post', postId],
        queryFn: getSingleCommunityPostInfo,
    });

    return (
        <div>
            <PostDetails
                {...omit(data, [
                    'likeCount',
                    'memberLiked',
                    'isMemberBookmarked',
                    'imageFileInfoDtoList',
                    'commentInfoDtoList',
                ])}
            />
            <PostInteraction
                {...pick(data, ['memberLiked', 'likeCount', 'memberBookmarked', 'bookmarkCount'])}
                postId={postId}
            />
            <div className={'my-5 flex flex-col gap-y-5'}>
                <CommentWriteForm postId={postId} />
                <CommentList commentInfoDtoList={data.commentInfoDtoList} />
            </div>
        </div>
    );
}

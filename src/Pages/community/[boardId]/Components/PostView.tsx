import { omit, pick } from 'lodash';
import { useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import PostDetails from '@/Pages/community/[boardId]/Components/PostDetails.tsx';
import PostInteraction from '@/Components/PostInfo/PostView/PostInteraction.tsx';
import CommentWriteForm from '@/Components/PostInfo/Comment/CommentWriteForm.tsx';
import CommentList from '@/Components/PostInfo/Comment/CommentList.tsx';
import fetchCommunityPostById from '@/Pages/community/Utils/fetchCommunityPostById.ts';
import useAuth from '@/Hooks/Auth/useAuth.tsx';

export default function PostView() {
    const postId = useParams().postId;

    const { data } = useSuspenseQuery({
        queryKey: ['post', postId],
        queryFn: fetchCommunityPostById,
    });

    const { user } = useAuth();

    return (
        <div>
            <PostDetails
                {...omit(data, ['memberLiked', 'memberBookmarked', 'imageFileInfoDtoList', 'commentInfoDtoList'])}
            />
            <PostInteraction
                {...pick(data, ['memberLiked', 'likeCount', 'memberBookmarked', 'bookmarkCount'])}
                postId={postId}
            />
            <div className={'my-5 flex flex-col gap-y-5'}>
                {user && <CommentWriteForm postId={postId} />}
                <CommentList postId={postId} commentInfoDtoList={data.commentInfoDtoList} />
            </div>
        </div>
    );
}

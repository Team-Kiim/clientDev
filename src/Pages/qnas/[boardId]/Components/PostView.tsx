import { omit, pick } from 'lodash';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import PostDetails from '@/Pages/qnas/[boardId]/Components/PostDetails.tsx';
import PostInteraction from '@/Components/PostInfo/PostView/PostInteraction.tsx';
import CommentWriteForm from '@/Components/PostInfo/Comment/CommentWriteForm.tsx';
import CommentList from '@/Components/PostInfo/Comment/CommentList.tsx';
import fetchQnAPostById from '@/Pages/qnas/Utils/fetchQnAPostById.ts';
import useAuth from '@/Hooks/Auth/useAuth.tsx';

export default function PostView() {
    const postId = useParams().postId;

    const { data } = useSuspenseQuery({
        queryKey: ['post', postId],
        queryFn: fetchQnAPostById,
    });

    const { user } = useAuth();

    return (
        <div className={'col-span-7'}>
            <PostDetails {...omit(data, ['memberLiked', 'memberBookmarked', 'imageFileInfoDtoList'])} />
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

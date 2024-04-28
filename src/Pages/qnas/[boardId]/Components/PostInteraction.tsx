import PostBookmarkButton from '@/Pages/qnas/[boardId]/Components/PostBookmarkButton.tsx';
import LikeButtonWithCount from '@/Pages/qnas/[boardId]/Components/LikeButtonWithCount.tsx';

interface Props {
    isMemberLiked: boolean;
    likeCount: number;
    isBookmarked: boolean;
    postId: string;
}

export default function PostInteraction({ isMemberLiked, likeCount, isBookmarked, postId }: Props) {
    return (
        <section className={'absolute -left-28 flex flex-col gap-y-7'}>
            <PostBookmarkButton isBookmarked={isBookmarked} postId={postId} />
            <LikeButtonWithCount isMemberLiked={isMemberLiked} likeCount={likeCount} postId={postId} />
        </section>
    );
}

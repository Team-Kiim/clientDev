import PostBookmarkButton from '@/Pages/Components/PostView/PostBookmarkButton.tsx';
import LikeButtonWithCount from '@/Pages/Components/PostView/LikeButtonWithCount.tsx';

interface Props {
    isMemberLiked: boolean;
    likeCount: number;
    isMemberBookmarked: boolean;
    postId: string;
}

export default function PostInteraction({ isMemberLiked, likeCount, isMemberBookmarked, postId }: Props) {
    return (
        <section className={'mb-2.5 flex items-center justify-end gap-x-4 border-b border-gray-300 pb-2.5'}>
            <LikeButtonWithCount isMemberLiked={isMemberLiked} likeCount={likeCount} postId={postId} />
            <PostBookmarkButton isBookmarked={isMemberBookmarked} postId={postId} />
        </section>
    );
}
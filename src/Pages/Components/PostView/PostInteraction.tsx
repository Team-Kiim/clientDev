import PostBookmarkButton from '@/Pages/Components/PostView/PostBookmarkButton.tsx';
import LikeButtonWithCount from '@/Pages/Components/PostView/LikeButtonWithCount.tsx';

interface Props {
    memberLiked: boolean;
    likeCount: number;
    isMemberBookmarked: boolean;
    postId: string;
}

export default function PostInteraction({ memberLiked, likeCount, isMemberBookmarked, postId }: Props) {
    return (
        <section className={'my-7 flex items-center justify-end gap-x-4 border-b border-gray-300 pb-2.5'}>
            <LikeButtonWithCount memberLiked={memberLiked} likeCount={likeCount} postId={postId} />
            <PostBookmarkButton isBookmarked={isMemberBookmarked} postId={postId} />
        </section>
    );
}

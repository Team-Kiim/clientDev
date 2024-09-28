import PostBookmarkButton from '@/Components/PostInfo/PostView/PostBookmarkButton.tsx';
import LikeButtonWithCount from '@/Components/PostInfo/PostView/LikeButtonWithCount.tsx';

interface Props {
    memberLiked: boolean;
    likeCount: number;
    memberBookmarked: boolean;
    bookmarkCount: number;
    postId: string;
}

export default function PostInteraction({ memberLiked, likeCount, memberBookmarked, bookmarkCount, postId }: Props) {
    return (
        <section className={'my-7 flex items-center gap-x-4 border-b border-slate-200 pb-2.5'}>
            <LikeButtonWithCount memberLiked={memberLiked} likeCount={likeCount} postId={postId} />
            <PostBookmarkButton memberBookmarked={memberBookmarked} bookmarkCount={bookmarkCount} postId={postId} />
        </section>
    );
}

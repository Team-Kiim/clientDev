import PostMetaInfo from '@/Pages/Components/PostView/PostMetaInfo.tsx';
import PostContent from '@/Pages/Components/PostView/PostContent.tsx';
import PostControl from '@/Pages/Components/PostView/PostControl.tsx';
import type { CommunityPostInfo } from '@/Types/PostInfo.ts';

type Props = Omit<
    CommunityPostInfo,
    'isMemberLiked' | 'likeCount' | 'isMemberBookmarked' | 'imageFileInfoDtoList' | 'commentInfoDtoList'
>;

export default function PostDetails({
    id,
    title,
    nickname,
    profileImagePath,
    bodyContent,
    viewCount,
    createdTime,
}: Props) {
    return (
        <article className={'flex max-w-full flex-col gap-y-2.5'}>
            <PostMetaInfo
                createdTime={createdTime}
                title={title}
                nickname={nickname}
                profileImgPath={profileImagePath}
                viewCount={viewCount}
            />
            <PostControl postId={id} />
            <hr />
            <PostContent bodyContent={bodyContent} />
        </article>
    );
}

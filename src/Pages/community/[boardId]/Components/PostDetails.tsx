import PostMetaInfo from '@/Pages/Components/PostView/PostMetaInfo.tsx';
import PostContent from '@/Pages/Components/PostView/PostContent.tsx';
import VoteSection from '@/Pages/community/[boardId]/Components/Vote/VoteSection.tsx';
import PostControl from '@/Pages/Components/PostView/PostControl.tsx';
import type { CommunityPostInfo } from '@/Types/PostInfo.ts';

type Props = Omit<
    CommunityPostInfo,
    'memberLiked' | 'likeCount' | 'isMemberBookmarked' | 'imageFileInfoDtoList' | 'commentInfoDtoList'
>;

export default function PostDetails({
    id,
    title,
    nickname,
    profileImagePath,
    profileImageName,
    bodyContent,
    viewCount,
    createdTime,
    memberWritten,
}: Props) {
    return (
        <article className={'flex max-w-full flex-col gap-y-2.5'}>
            <PostMetaInfo
                createdTime={createdTime}
                title={title}
                nickname={nickname}
                profileImagePath={profileImagePath}
                profileImageName={profileImageName}
                viewCount={viewCount}
            />
            {memberWritten && <PostControl postId={id} />}
            <hr />
            <PostContent bodyContent={bodyContent} />
            <VoteSection />
        </article>
    );
}

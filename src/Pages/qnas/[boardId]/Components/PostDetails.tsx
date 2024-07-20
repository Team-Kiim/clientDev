import PostMetaInfo from '@/Pages/Components/PostView/PostMetaInfo.tsx';
import PostContent from '@/Pages/Components/PostView/PostContent.tsx';
import PostControl from '@/Pages/Components/PostView/PostControl.tsx';
import PostKeywordList from '@/Pages/qnas/[boardId]/Components/PostKeywordList.tsx';
import type { QnAPostInfo } from '@/Types/PostInfo.ts';

type Props = Omit<QnAPostInfo, 'isMemberLiked' | 'likeCount' | 'isMemberBookmarked' | 'imageFileInfoDtoList'>;

export default function PostDetails({
    id,
    title,
    nickname,
    profileImagePath,
    bodyContent,
    viewCount,
    createdTime,
    skillCategories,
    memberWritten,
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
            {memberWritten && <PostControl postId={id} />}
            <hr />
            <PostContent bodyContent={bodyContent} />
            <PostKeywordList categories={skillCategories} />
        </article>
    );
}

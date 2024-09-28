import PostMetaInfo from '@/Components/PostInfo/PostView/PostMetaInfo.tsx';
import PostContent from '@/Components/PostInfo/PostView/PostContent.tsx';
import PostControl from '@/Components/PostInfo/PostView/PostControl.tsx';
import PostSkillCategoryList from '@/Pages/qnas/[boardId]/Components/PostSkillCategoryList.tsx';
import type { QnAPostInfo } from '@/Types/PostInfo.ts';

type Props = Omit<QnAPostInfo, 'memberLiked' | 'likeCount' | 'memberBookmarked' | 'imageFileInfoDtoList'>;

export default function PostDetails({
    id,
    title,
    nickname,
    profileImageName,
    profileImagePath,
    bodyContent,
    viewCount,
    createdTime,
    skillCategoryList,
    memberWritten,
    memberId,
    visualData,
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
                memberId={memberId}
            />
            {memberWritten && <PostControl postType={'qnas'} postId={id} />}
            <hr />
            <PostContent bodyContent={bodyContent} visualData={visualData} />
            <PostSkillCategoryList categories={skillCategoryList} />
        </article>
    );
}

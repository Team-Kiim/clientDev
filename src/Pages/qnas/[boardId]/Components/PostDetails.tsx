import PostHeader from '@/Components/PostInfo/PostView/PostHeader.tsx';
import PostContent from '@/Components/PostInfo/PostView/PostContent.tsx';
import PostSkillCategoryList from '@/Pages/qnas/[boardId]/Components/PostSkillCategoryList.tsx';
import PostHashtagList from '@/Components/PostInfo/PostView/PostHashtagList.tsx';
import type { QnAPostInfo } from '@/Types/PostInfo.ts';

type Props = Omit<QnAPostInfo, 'memberLiked' | 'memberBookmarked' | 'imageFileInfoDtoList'>;

export default function PostDetails({
    id,
    title,
    nickname,
    profileImageName,
    profileImagePath,
    bodyContent,
    viewCount,
    likeCount,
    createdTime,
    skillCategoryList,
    memberWritten,
    memberId,
    visualData,
    tagInfoDtoList,
}: Props) {
    return (
        <article className={'flex max-w-full flex-col gap-y-2.5'}>
            <PostHeader
                createdTime={createdTime}
                title={title}
                nickname={nickname}
                profileImageName={profileImageName}
                profileImagePath={profileImagePath}
                viewCount={viewCount}
                likeCount={likeCount}
                memberId={memberId}
                memberWritten={memberWritten}
                postId={id}
                postType={'qnas'}
            />
            <hr />
            <PostContent bodyContent={bodyContent} visualData={visualData} />
            <div className={'my-2 flex w-full flex-col gap-y-2'}>
                <PostSkillCategoryList categories={skillCategoryList} />
                {tagInfoDtoList.length !== 0 && <PostHashtagList hashtagList={tagInfoDtoList} />}
            </div>
        </article>
    );
}

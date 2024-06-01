import PostMetaInfo from '@/Pages/chats/[roomId]/Components/PostViewChatVer/PostMetaInfo.tsx';
import PostContent from '@/Pages/Components/PostView/PostContent.tsx';
import PostSkillCategoryList from '@/Pages/qnas/[boardId]/Components/PostSkillCategoryList.tsx';
import type { QnAPostInfo } from '@/Types/PostInfo.ts';

type Props = Omit<
    QnAPostInfo,
    'id' | 'isMemberLiked' | 'likeCount' | 'isMemberBookmarked' | 'imageFileInfoDtoList' | 'viewCount'
>;

export default function PostDetails({
    title,
    nickname,
    profileImageName,
    profileImagePath,
    bodyContent,
    createdTime,
    skillCategoryList,
}: Props) {
    return (
        <article className={'flex max-w-full flex-col gap-y-2.5'}>
            <PostMetaInfo
                createdTime={createdTime}
                title={title}
                nickname={nickname}
                profileImageName={profileImageName}
                profileImagePath={profileImagePath}
            />
            <hr />
            <PostContent bodyContent={bodyContent} />
            <PostSkillCategoryList categories={skillCategoryList} />
        </article>
    );
}

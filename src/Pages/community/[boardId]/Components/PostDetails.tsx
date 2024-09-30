import PostHeader from '@/Components/PostInfo/PostView/PostHeader.tsx';
import PostContent from '@/Components/PostInfo/PostView/PostContent.tsx';
import VoteSection from '@/Pages/community/[boardId]/Components/Vote/VoteSection.tsx';
import PostHashtagList from '@/Components/PostInfo/PostView/PostHashtagList.tsx';
import type { CommunityPostInfo } from '@/Types/PostInfo.ts';

type Props = Omit<
    CommunityPostInfo,
    'memberLiked' | 'memberBookmarked' | 'imageFileInfoDtoList' | 'commentInfoDtoList'
>;

export default function PostDetails({
    id,
    title,
    nickname,
    profileImagePath,
    profileImageName,
    bodyContent,
    viewCount,
    likeCount,
    createdTime,
    memberWritten,
    voteResponse,
    memberId,
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
                postType={'community'}
            />
            <hr />
            <PostContent bodyContent={bodyContent} />
            {voteResponse && (
                <VoteSection
                    voteTopic={voteResponse.title}
                    voteItems={voteResponse.voteItemResponseList}
                    memberVoted={voteResponse.memberVoted}
                />
            )}
            {tagInfoDtoList.length !== 0 && (
                <div className={'my-2 w-full'}>
                    <PostHashtagList hashtagList={tagInfoDtoList} />
                </div>
            )}
        </article>
    );
}

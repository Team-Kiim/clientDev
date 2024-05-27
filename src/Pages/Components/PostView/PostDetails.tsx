import PostMetaInfo from '@/Pages/Components/PostView/PostMetaInfo.tsx';
import PostControl from '@/Pages/Components/PostView/PostControl.tsx';
import PostContent from '@/Pages/Components/PostView/PostContent.tsx';
import PostKeywordList from '@/Pages/qnas/[boardId]/Components/PostKeywordList.tsx';
import type { Post } from '@/Types/Post.ts';

type Props = Omit<Post, 'isBookmarked' | 'likeCount' | 'dislikeCount'>;

export default function PostDetails({
    id,
    title,
    userNickname,
    profileImgSrc,
    bodyContent,
    viewCount,
    createdTime,
    modifiedTime,
    skillCategories,
}: Props) {
    return (
        <>
            <article className={'flex max-w-full flex-col gap-y-2.5'}>
                <PostMetaInfo
                    createdTime={createdTime}
                    title={title}
                    userNickname={userNickname}
                    profileImgSrc={profileImgSrc}
                    viewCount={viewCount}
                />
                <PostControl postId={id} />
                <hr />
                <PostContent bodyContent={bodyContent} />
                <PostKeywordList keywords={skillCategories} />
            </article>
        </>
    );
}

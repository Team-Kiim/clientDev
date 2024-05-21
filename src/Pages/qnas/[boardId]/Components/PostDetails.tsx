import PostMetaInfo from '@/Pages/qnas/[boardId]/Components/PostMetaInfo.tsx';
import PostControl from '@/Pages/qnas/[boardId]/Components/PostControl.tsx';
import PostContent from '@/Pages/qnas/[boardId]/Components/PostContent.tsx';
import type { Post } from '@/Types/PostTypes.ts';

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
            <main className={'mb-10 flex max-w-full flex-col gap-y-2.5'}>
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
            </main>
        </>
    );
}

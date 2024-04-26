import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import PostMetaInfo from '@/Pages/qnas/[boardId]/Components/PostMetaInfo.tsx';
import PostContent from '@/Pages/qnas/[boardId]/Components/PostContent.tsx';
import getSinglePostData from '@/Pages/qnas/[boardId]/Utils/getSinglePostData.ts';

export default function PostDetails() {
    const postId = useParams().postId;

    const { data } = useSuspenseQuery({
        queryKey: ['post', postId],
        queryFn: getSinglePostData,
    });

    console.log(data);

    return (
        <>
            <main className={'col-span-7 flex h-[300px] max-w-full flex-col gap-y-5'}>
                <PostMetaInfo
                    createdTime={data.createdTime}
                    title={data.title}
                    userNickname={data.userNickname}
                    profileImgSrc={data.profileImgSrc}
                />
                <hr />
                <PostContent bodyContent={data.bodyContent} />
            </main>
        </>
    );
}

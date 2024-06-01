import { useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import PostDetails from '@/Pages/chats/[roomId]/Components/PostViewChatVer/PostDetails.tsx';
import getSingleQnAPostInfo from '@/Pages/chats/[roomId]/Utils/getSingleQnAPostInfo.ts';

export default function PostViewChatVer() {
    const roomId = useParams().roomId;

    const { data } = useSuspenseQuery({
        queryKey: ['post', roomId],
        queryFn: getSingleQnAPostInfo,
    });

    return (
        <div className={'col-span-6 h-full overflow-y-auto py-8 scrollbar-hide'}>
            <PostDetails
                title={data.title}
                nickname={data.nickname}
                bodyContent={data.bodyContent}
                createdTime={data.createdTime}
                skillCategoryList={data.skillCategoryList}
                profileImageName={data.profileImageName}
                profileImagePath={data.profileImagePath}
            />
        </div>
    );
}

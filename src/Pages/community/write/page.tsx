import axios from 'axios';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import CommunityPostWriteForm from '@/Pages/community/write/Components/CommunityPostWriteForm.tsx';

export default function Page() {
    const postId = window.localStorage.getItem('currentCommunityPostId');

    const { data, isSuccess, isError, isLoading } = useQuery<number>({
        queryKey: ['post', 'community', 'initialId'],
        queryFn: () => {
            return axios.post('/api/community-post/init').then(response => response.data);
            // return Promise.resolve(1);
        },
        gcTime: 0,
        enabled: !postId,
    });

    useEffect(() => {
        return () => {
            window.localStorage.removeItem('currentCommunityPostId');
        };
    }, []);

    if (isError) {
        //TODO
        // 알림
        return null;
    }

    if (isSuccess) {
        console.log(data);
        window.localStorage.setItem('currentCommunityPostId', String(data));
    }

    if (isLoading) {
        return null;
    }

    return (
        <div className={'flex w-full min-w-[1500px] justify-center'}>
            <div className={'my-5 flex w-[45rem] flex-col gap-y-3'}>
                <h1 className={'text-2xl font-extrabold'}>커뮤니티 게시글 작성</h1>
                <CommunityPostWriteForm postId={Number(postId ?? data)} />
            </div>
        </div>
    );
}

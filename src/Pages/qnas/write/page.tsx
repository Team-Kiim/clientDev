import axios from 'axios';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import QnAWriteForm from '@/Pages/qnas/write/Components/QnAWriteForm.tsx';

export default function Page() {
    const postId = window.localStorage.getItem('currentQnAPostId');

    const { data, isSuccess, isError, isLoading } = useQuery<number>({
        queryKey: ['post', 'qna', 'initialId'],
        queryFn: () => {
            // return axios.post('/api/dev-post/init').then(response => response.data);
            return Promise.resolve(1);
        },
        gcTime: 0,
        enabled: !postId,
    });

    useEffect(() => {
        return () => {
            window.localStorage.removeItem('currentQnAPostId');
        };
    }, []);

    if (isError) {
        //TODO
        // 알림
        return null;
    }

    if (isSuccess) {
        window.localStorage.setItem('currentQnAPostId', String(data));
    }

    if (isLoading) {
        return null;
    }

    return (
        <div className={'flex w-full min-w-[1500px] justify-center'}>
            <div className={'my-5 flex w-[45rem] flex-col gap-y-3'}>
                <QnAWriteForm postId={Number(postId ?? data)} />
            </div>
        </div>
    );
}

import axios from 'axios';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import QnAPostWriteForm from '@/Pages/qnas/write/Components/QnAPostWriteForm.tsx';

export default function Page() {
    const navigate = useNavigate();

    const postIdToBeCreated = window.localStorage.getItem('qnaPostIdToBeCreated');

    const { data, isSuccess, isLoading, isError, refetch } = useQuery({
        queryKey: ['post', 'qna', 'idToBeCreated'],
        queryFn: () => {
            return axios.post('/api/dev-post/init').then(response => response.data);
        },
        gcTime: 0,
        enabled: !postIdToBeCreated,
    });

    useEffect(() => {
        return () => {
            window.localStorage.removeItem('qnaPostIdToBeCreated');
        };
    }, []);

    if (isLoading) {
        return null;
    }

    if (isSuccess) {
        window.localStorage.setItem('qnaPostIdToBeCreated', String(data));
    }

    if (isError) {
        Swal.fire({
            icon: 'error',
            html: '<p class="leading-relaxed">현재 게시글을 작성할 수 없습니다.<br/>잠시 후 다시 시도해주세요.</p>',
            showCancelButton: true,
            confirmButtonText: '다시 시도',
            cancelButtonText: '이전 페이지',
            customClass: {
                cancelButton: 'text-black font-bold bg-slate-100',
                confirmButton: 'text-white font-bold bg-plump-purple-600',
            },
        }).then(result => {
            if (result.isConfirmed) {
                return refetch();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                navigate(-1);
            }
        });
        return null;
    }

    return (
        <div className={'relative flex w-full min-w-[1500px] justify-center'}>
            <div className={'my-5 flex flex-col gap-y-5'}>
                <h1 className={'mx-0.5 text-lg font-extrabold'}>QnA 게시글 작성</h1>
                <QnAPostWriteForm postId={postIdToBeCreated ?? data} />
            </div>
        </div>
    );
}

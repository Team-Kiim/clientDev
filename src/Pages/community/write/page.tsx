import axios from 'axios';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import CommunityPostWriteForm from '@/Pages/community/write/Components/CommunityPostWriteForm.tsx';

export default function Page() {
    const navigate = useNavigate();

    const postId = window.localStorage.getItem('currentCommunityPostId');

    const { data, isSuccess, isLoading, isError, refetch } = useQuery({
        queryKey: ['post', 'community', 'initialId'],
        queryFn: () => {
            return axios.post('/api/community-post/init').then(response => response.data);
        },
        gcTime: 0,
        enabled: !postId,
    });

    useEffect(() => {
        return () => {
            window.localStorage.removeItem('currentCommunityPostId');
        };
    }, []);

    if (isLoading) {
        return null;
    }

    if (isSuccess) {
        window.localStorage.setItem('currentCommunityPostId', String(data));
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
                confirmButton: 'text-white font-bold bg-violet-600',
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
                <h1 className={'mx-0.5 text-lg font-extrabold'}>커뮤니티 게시글 작성</h1>
                <CommunityPostWriteForm postId={Number(postId ?? data)} />
            </div>
        </div>
    );
}

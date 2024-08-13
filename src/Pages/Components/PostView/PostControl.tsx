import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';

interface Props {
    postId: number;
}

export default function PostControl({ postId }: Props) {
    const navigate = useNavigate();

    const { mutate: deleteMutate } = useMutation({
        mutationFn: () => {
            return axios.delete(`/api/post/delete/${postId}`);
        },

        onSuccess: async () => {
            await Swal.fire({
                icon: 'success',
                text: '성공적으로 삭제하였습니다.',
                confirmButtonText: '확인',
                customClass: {
                    confirmButton: 'text-white font-bold bg-violet-600',
                },
            });
            navigate('/');
        },

        onError: async () => {
            await Swal.fire({
                icon: 'error',
                text: '게시글을 삭제할 수 없습니다. 잠시 후 다시 시도해주세요.',
                customClass: {
                    confirmButton: 'text-white font-bold bg-violet-600',
                },
            });
            return;
        },
    });

    const handleDeletePostButtonClick = () => {
        Swal.fire({
            icon: 'warning',
            text: '정말로 게시글을 삭제하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '삭제',
            cancelButtonText: '취소',
            confirmButtonColor: '#7c3aed',
            cancelButtonColor: '#f1f5f9',
            customClass: {
                cancelButton: 'text-black font-bold',
                confirmButton: 'font-bold',
            },
        }).then(result => {
            if (result.isConfirmed) {
                deleteMutate();
            }
        });
    };

    return (
        <div className={'flex w-full justify-end gap-x-2 text-[0.9rem]'}>
            <button
                className={'flex items-center gap-x-1'}
                type={'button'}
                onClick={() => {
                    navigate(`/qnas/edit/${postId}`);
                }}
            >
                <span className={'hover:underline hover:underline-offset-4'}>수정</span>
            </button>
            <span>•</span>
            <button className={'flex items-center gap-x-1'} type={'button'} onClick={handleDeletePostButtonClick}>
                <span className={'hover:underline hover:underline-offset-4'}>삭제</span>
            </button>
        </div>
    );
}

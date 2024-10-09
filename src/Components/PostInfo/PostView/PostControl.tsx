import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { HiOutlineExclamationCircle } from 'react-icons/hi2';
import ALERT_STYLE from '@/Constants/alertStyle.ts';

interface Props {
    postId: number;
    postType: string;
}

export default function PostControl({ postId, postType }: Props) {
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
            navigate(`/${postType}`);
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
        withReactContent(Swal)
            .fire({
                title: (
                    <div className={'flex items-center gap-x-2'}>
                        <HiOutlineExclamationCircle className={'size-6 text-amber-500'} />
                        <h1 className={'font-bold'}>게시글 삭제</h1>
                    </div>
                ),
                html: <p className={'text-sm text-slate-500'}>정말로 게시글을 삭제하시겠습니까?</p>,
                showCancelButton: true,
                confirmButtonText: '삭제',
                cancelButtonText: '취소',
                customClass: ALERT_STYLE,
            })
            .then(result => {
                if (result.isConfirmed) {
                    deleteMutate();
                }
            });
    };

    return (
        <div className={'flex w-full justify-end gap-x-1.5 text-[0.85rem] font-bold text-slate-500'}>
            <button
                className={'flex items-center gap-x-1'}
                type={'button'}
                onClick={() => {
                    navigate(`/${postType}/edit/${postId}`);
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

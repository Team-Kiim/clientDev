import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi2';
import useDeletePostMutation from '@/Hooks/PostMutation/useDeletePostMutation.tsx';
import ALERT_STYLE from '@/Constants/alertStyle.ts';

interface Props {
    postId: number;
    postType: string;
}

export default function PostControl({ postId, postType }: Props) {
    const navigate = useNavigate();

    const { deletePost } = useDeletePostMutation();

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
                    deletePost(postId);
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

import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi2';
import ALERT_STYLE from '@/Constants/alertStyle.ts';

const useDeletePostMutation = () => {
    const navigate = useNavigate();

    const { pathname } = useLocation();

    const { mutate: deletePost } = useMutation({
        mutationFn: (postId: number) => {
            return axios.delete(`/api/post/delete/${postId}`);
        },

        onSuccess: async () => {
            await withReactContent(Swal).fire({
                title: (
                    <div className={'flex items-center gap-x-2'}>
                        <HiOutlineCheckCircle className={'size-6 text-green-500'} />
                        <h1 className={'font-bold'}>게시글 삭제 완료</h1>
                    </div>
                ),
                html: <p className={'text-sm text-slate-500'}>게시글을 성공적으로 삭제하였습니다.</p>,
                customClass: ALERT_STYLE,
                confirmButtonText: '확인',
            });
            const postType = pathname.split('/')[1];
            navigate(`/${postType}`, { replace: true });
        },

        onError: async () => {
            await withReactContent(Swal).fire({
                title: (
                    <div className={'flex items-center gap-x-2'}>
                        <HiOutlineXCircle className={'size-6 text-rose-500'} />
                        <h1 className={'font-bold'}>게시글 삭제 실패</h1>
                    </div>
                ),
                html: (
                    <p className={'text-sm leading-relaxed text-slate-500'}>
                        게시글을 삭제할 수 없습니다. 잠시 후 다시 시도해주세요.
                    </p>
                ),
                customClass: ALERT_STYLE,
                confirmButtonText: '확인',
            });
        },
    });

    return { deletePost };
};

export default useDeletePostMutation;

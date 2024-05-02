import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

interface Props {
    postId: number;
}

export default function PostControl({ postId }: Props) {
    const navigate = useNavigate();

    const { mutate: deleteMutate } = useMutation({
        mutationFn: () => {
            //TODO
            // 게시글 삭제 API 요청
            return Promise.resolve(1);
        },

        onSuccess: () => {
            window.alert('성공적으로 삭제하였습니다.');
            navigate('/');
        },

        onError: () => {
            window.alert('게시글을 삭제할 수 없습니다. 잠시 후 다시 시도해주세요.');
            return;
        },
    });

    return (
        <div className={'flex w-full justify-end gap-x-1 text-[0.95rem] font-medium text-gray-500'}>
            <button
                className={'rounded-lg px-2 py-1 transition-all hover:bg-violet-50 hover:text-violet-600'}
                type={'button'}
                onClick={() => {
                    navigate(`/qnas/edit/${postId}`);
                }}
            >
                수정
            </button>
            <button
                className={'rounded-lg px-2 py-1 transition-all hover:bg-red-50 hover:text-red-700'}
                type={'button'}
                onClick={() => {
                    if (window.confirm('정말로 삭제하시겠습니까?')) {
                        deleteMutate();
                    }
                }}
            >
                삭제
            </button>
        </div>
    );
}

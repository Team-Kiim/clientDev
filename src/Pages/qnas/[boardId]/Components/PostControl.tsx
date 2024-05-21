import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { MdEdit, MdOutlineDelete } from 'react-icons/md';

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
        <div className={'flex w-full justify-end gap-x-4 text-[0.9rem] font-medium text-gray-500'}>
            <button
                className={'flex items-center gap-x-1 text-gray-700'}
                type={'button'}
                onClick={() => {
                    navigate(`/qnas/edit/${postId}`);
                }}
            >
                <span className={'font-bold'}>수정하기</span>
                <MdEdit className={'size-5'} />
            </button>
            <button
                className={'flex items-center gap-x-1 text-red-700'}
                type={'button'}
                onClick={() => {
                    if (window.confirm('정말로 삭제하시겠습니까?')) {
                        deleteMutate();
                    }
                }}
            >
                <span className={'font-bold'}>삭제하기</span>
                <MdOutlineDelete className={'size-5'} />
            </button>
        </div>
    );
}

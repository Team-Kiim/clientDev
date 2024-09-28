import axios from 'axios';
import dompurify from 'dompurify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import TOAST_OPTIONS from '@/Constants/toastOptions.ts';
import CommentEditor from '@/Pages/community/[boardId]/Components/Comment/CommentEditor/CommentEditor.tsx';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    postId: string;
}

interface FormData {
    commentValue: string;
}

export default function CommentWriteForm({ postId }: Props) {
    const queryClient = useQueryClient();

    const {
        control,
        handleSubmit,
        formState: { errors, submitCount, isSubmitSuccessful },
    } = useForm<FormData>({
        defaultValues: {
            commentValue: '',
        },
    });

    const {
        field: { onChange, onBlur },
    } = useController<FormData>({
        name: 'commentValue',
        control,
        rules: {
            required: {
                value: true,
                message: '내용을 입력해주세요.',
            },
        },
    });

    const { mutateAsync: commentPostMutate } = useMutation({
        mutationFn: (commentValue: string) => {
            return axios.post(`/api/comment`, {
                postId: Number(postId),
                content: commentValue,
            });
        },

        onError: error => {
            console.error(error);
            toast.error(
                <div className={'text-[0.85rem]'}>
                    댓글을 작성할 수 없습니다.
                    <br />
                    잠시 후 다시 시도해주세요.
                </div>,
                TOAST_OPTIONS,
            );
        },

        onSettled: () => {
            return queryClient.invalidateQueries({ queryKey: ['post', postId] });
        },
    });

    const onSubmit: SubmitHandler<FormData> = async data => {
        await commentPostMutate(dompurify.sanitize(data.commentValue));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-y-4'}>
            <div className={'flex h-60 flex-col rounded-xl border border-slate-200'}>
                <CommentEditor
                    submitCount={submitCount}
                    onChange={onChange}
                    onBlur={onBlur}
                    isSubmitSuccessful={isSubmitSuccessful}
                />
            </div>
            <div className={'flex items-center'}>
                {errors?.commentValue?.message && errors?.commentValue.type === 'required' && (
                    <div className={'m-0.5 mr-auto flex items-center gap-x-1 justify-self-start text-rose-500'}>
                        <AiOutlineExclamationCircle className={'size-4'} />
                        <p className={'text-[0.8rem]'}>{errors.commentValue.message}</p>
                    </div>
                )}
                <button
                    className={
                        'ml-auto rounded-lg bg-plump-purple-600 px-3.5 py-2 text-[0.85rem] font-bold text-white transition-all hover:bg-plump-purple-700'
                    }
                >
                    등록
                </button>
            </div>
        </form>
    );
}

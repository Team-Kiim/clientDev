import axios from 'axios';
import dompurify from 'dompurify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import CommentEditor from '@/Pages/community/[boardId]/Components/Comment/CommentEditor/CommentEditor.tsx';

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
        resetField,
        formState: { errors, submitCount },
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

    const { mutate: commentPostMutate } = useMutation({
        mutationFn: (commentValue: string) => {
            return axios.post(`/api/comment/${postId}/comments`, {
                content: commentValue,
            });
        },

        onError: error => {
            console.log(error);
        },

        onSettled: () => {
            resetField('commentValue');
            return queryClient.invalidateQueries({ queryKey: ['post', postId] });
        },
    });

    const onSubmit: SubmitHandler<FormData> = data => {
        commentPostMutate(dompurify.sanitize(data.commentValue));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-y-4'}>
            <div className={'flex h-60 flex-col rounded-xl border border-slate-200'}>
                <CommentEditor submitCount={submitCount} onChange={onChange} onBlur={onBlur} />
            </div>
            <div className={'flex items-center'}>
                {errors?.commentValue?.message && errors?.commentValue.type === 'required' && (
                    <div className={'m-0.5 mr-auto flex items-center gap-x-1 justify-self-start text-red-500'}>
                        <AiOutlineExclamationCircle className={'size-4'} />
                        <p className={'text-[0.8rem]'}>{errors.commentValue.message}</p>
                    </div>
                )}
                <button
                    className={
                        'ml-auto rounded-lg border border-violet-300 bg-violet-50 px-3 py-1.5 text-[0.85rem] font-bold text-violet-700'
                    }
                >
                    등록
                </button>
            </div>
        </form>
    );
}

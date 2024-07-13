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
        formState: { errors, isSubmitSuccessful },
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={'flex h-56 flex-col rounded-xl border border-slate-100 shadow-lg'}>
                <CommentEditor isSubmitSuccessful={isSubmitSuccessful} onChange={onChange} onBlur={onBlur} />
                <div className={'flex items-center p-2.5'}>
                    {errors?.commentValue?.message && errors?.commentValue.type === 'required' && (
                        <div className={'m-0.5 mr-auto flex items-center gap-x-1 justify-self-start text-rose-700'}>
                            <AiOutlineExclamationCircle className={'size-4'} />
                            <p className={'text-[0.8rem] font-bold'}>{errors.commentValue.message}</p>
                        </div>
                    )}
                    <button
                        className={
                            'ml-auto rounded-2xl bg-violet-600 px-4 py-2.5 text-[0.9rem] font-bold text-white transition-all hover:bg-violet-700'
                        }
                        type={'submit'}
                    >
                        작성
                    </button>
                </div>
            </div>
        </form>
    );
}

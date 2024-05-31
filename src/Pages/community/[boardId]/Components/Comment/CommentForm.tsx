import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface Props {
    postId: string;
}

interface FormData {
    commentValue: string;
}

export default function CommentForm({ postId }: Props) {
    const queryClient = useQueryClient();

    const {
        handleSubmit,
        register,
        resetField,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        mode: 'onBlur',
        defaultValues: {
            commentValue: '',
        },
    });

    const { mutate: commentPostMutate } = useMutation({
        mutationFn: (commentValue: string) => {
            return axios.post(`/api/comment/${postId}/comments`, {
                content: commentValue,
            });
        },

        onError: error => {
            console.error(error);
        },

        onSettled: () => {
            resetField('commentValue');
            return queryClient.invalidateQueries({ queryKey: ['post', postId] });
        },
    });

    const onSubmit: SubmitHandler<FormData> = data => {
        commentPostMutate(data.commentValue);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={'flex flex-col gap-y-2'}>
                <div className={'rounded-xl border border-gray-300 shadow-md focus-within:border-violet-700'}>
                    <textarea
                        className={'h-36 w-full resize-none rounded-xl p-3 text-sm focus:outline-none'}
                        placeholder={'댓글 내용을 입력해주세요.'}
                        {...register('commentValue', {
                            required: {
                                value: true,
                                message: '댓글 내용을 입력해주세요.',
                            },
                        })}
                    />
                </div>
                {errors?.commentValue?.message && errors?.commentValue.type === 'required' && (
                    <div className={'m-0.5 flex items-center gap-x-1 text-red-700 '}>
                        <ExclamationTriangleIcon className={'size-5'} />
                        <p className={'text-[0.8rem] font-bold'}>{errors.commentValue.message}</p>
                    </div>
                )}
            </div>
            <div className={'my-3.5 flex w-full justify-end'}>
                <button
                    className={
                        'rounded-xl bg-violet-600 px-5 py-2.5 text-[0.9rem] font-bold text-white transition-all hover:bg-violet-700 active:scale-95 disabled:opacity-75'
                    }
                    type={'submit'}
                    disabled={isSubmitting}
                >
                    등록
                </button>
            </div>
        </form>
    );
}

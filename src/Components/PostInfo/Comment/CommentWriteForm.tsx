import dompurify from 'dompurify';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import CommentEditor from '@/Components/PostInfo/Comment/CommentEditor/CommentEditor.tsx';
import useAddComment from '@/Components/PostInfo/Comment/Hooks/useAddComment.tsx';

interface Props {
    postId: string;
}

interface FormData {
    commentValue: string;
}

export default function CommentWriteForm({ postId }: Props) {
    const {
        control,
        handleSubmit,
        formState: { errors, submitCount, isSubmitSuccessful },
        setValue,
    } = useForm<FormData>({
        mode: 'onBlur',
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

    const { mutateAsync: addComment } = useAddComment();

    const onSubmit: SubmitHandler<FormData> = async data => {
        await addComment({
            postId: postId,
            commentValue: dompurify.sanitize(data.commentValue),
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-y-4'}>
            <div className={'flex h-60 flex-col rounded-xl border border-slate-200'}>
                <CommentEditor
                    submitCount={submitCount}
                    onChange={onChange}
                    onBlur={onBlur}
                    setValue={setValue}
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

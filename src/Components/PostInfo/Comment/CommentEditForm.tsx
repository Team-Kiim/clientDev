import dompurify from 'dompurify';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import { HiOutlineExclamationCircle } from 'react-icons/hi2';
import CommentEditor from '@/Components/PostInfo/Comment/CommentEditor/CommentEditor.tsx';
import { useEditComment } from '@/Components/PostInfo/Comment/Hooks/useEditComment.tsx';

interface Props {
    postId: string;
    commentId: number;
    originalCommentValue: string;
    closeCommentEditForm(): void;
}

interface FormData {
    commentValue: string;
}

export default function CommentEditForm({ postId, commentId, originalCommentValue, closeCommentEditForm }: Props) {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
    } = useForm<FormData>({
        defaultValues: {
            commentValue: originalCommentValue,
        },
    });

    const {
        field: { value, onChange, onBlur },
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

    const { mutateAsync } = useEditComment(postId);

    const onSubmit: SubmitHandler<FormData> = async data => {
        const commentValue = dompurify.sanitize(data.commentValue);
        await mutateAsync({
            newCommentValue: commentValue,
            commentId,
        });
        closeCommentEditForm();
    };

    return (
        <form className={'flex w-full flex-col gap-y-4'} onSubmit={handleSubmit(onSubmit)}>
            <div className={'flex h-48 flex-col rounded-xl border border-slate-200'}>
                <CommentEditor
                    value={value}
                    isSubmitSuccessful={isSubmitSuccessful}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </div>
            <div className={'flex items-center'}>
                {errors?.commentValue?.message && errors?.commentValue.type === 'required' && (
                    <div className={'m-0.5 mr-auto flex items-center gap-x-1 justify-self-start text-rose-500'}>
                        <HiOutlineExclamationCircle className={'size-4'} />
                        <p className={'text-[0.8rem]'}>{errors.commentValue.message}</p>
                    </div>
                )}
                <button
                    className={
                        'ml-auto rounded-lg bg-plump-purple-600 px-3.5 py-2 text-[0.85rem] font-bold text-white transition-all hover:bg-plump-purple-700'
                    }
                >
                    수정
                </button>
            </div>
        </form>
    );
}

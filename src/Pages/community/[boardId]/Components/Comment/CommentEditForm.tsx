import dompurify from 'dompurify';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { RiEditLine } from 'react-icons/ri';
import CommentEditor from '@/Pages/community/[boardId]/Components/Comment/CommentEditor/CommentEditor.tsx';
import { useEditComment } from '@/Pages/community/[boardId]/Components/Comment/Hooks/useEditComment.tsx';

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
        <form className={'w-full'} onSubmit={handleSubmit(onSubmit)}>
            <div className={'flex h-48 flex-col rounded-xl border border-slate-200'}>
                <CommentEditor
                    value={value}
                    isSubmitSuccessful={isSubmitSuccessful}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                <div className={'flex items-center p-2.5'}>
                    {errors?.commentValue?.message && errors?.commentValue.type === 'required' && (
                        <div className={'m-0.5 mr-auto flex items-center gap-x-1 justify-self-start text-rose-700'}>
                            <AiOutlineExclamationCircle className={'size-4'} />
                            <p className={'text-[0.8rem]'}>{errors.commentValue.message}</p>
                        </div>
                    )}
                    <div className={'tooltip tooltip-bottom ml-auto'} data-tip={'댓글 수정'}>
                        <button className={'rounded-full p-1.5 transition-all hover:bg-slate-100'} type={'submit'}>
                            <RiEditLine className={'size-6'} />
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

import dompurify from 'dompurify';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { HiOutlineReply } from 'react-icons/hi';
import CommentEditor from '@/Pages/community/[boardId]/Components/Comment/CommentEditor/CommentEditor.tsx';

interface Props {
    postId: string;
    commentId: number;
}

interface FormData {
    commentValue: string;
}

export default function ReplyForm({ postId, commentId }: Props) {
    const {
        control,
        handleSubmit,
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
                message: '답글 내용을 입력해주세요.',
            },
        },
    });

    const onSubmit: SubmitHandler<FormData> = data => {
        const commentValue = dompurify.sanitize(data.commentValue);
        console.log(commentValue);
    };

    return (
        <form className={'w-full'} onSubmit={handleSubmit(onSubmit)}>
            <div className={'flex h-48 flex-col rounded-xl border border-slate-200'}>
                <CommentEditor onChange={onChange} onBlur={onBlur} submitCount={submitCount} />
                <div className={'flex items-center p-2.5'}>
                    {errors?.commentValue?.message && errors?.commentValue.type === 'required' && (
                        <div className={'m-0.5 mr-auto flex items-center gap-x-1 text-rose-700'}>
                            <AiOutlineExclamationCircle className={'size-4'} />
                            <p className={'text-[0.8rem]'}>{errors.commentValue.message}</p>
                        </div>
                    )}
                    <div className={'tooltip tooltip-bottom ml-auto'} data-tip={'답글 작성'}>
                        <button className={'rounded-full p-1.5 transition-all hover:bg-slate-100'}>
                            <HiOutlineReply className={'size-6'} />
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

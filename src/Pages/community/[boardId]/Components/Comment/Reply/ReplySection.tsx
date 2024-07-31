import ReplyForm from '@/Pages/community/[boardId]/Components/Comment/Reply/ReplyForm.tsx';

interface Props {
    postId: string;
    commentId: number;
}

export default function ReplySection({ postId, commentId }: Props) {
    return (
        <div className={'w-full border-t border-slate-300 py-3'}>
            <ReplyForm postId={postId} commentId={commentId} />
        </div>
    );
}

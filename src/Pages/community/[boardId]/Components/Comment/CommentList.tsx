import CommentListItem from '@/Pages/community/[boardId]/Components/Comment/CommentListItem.tsx';
import type { CommentInfo } from '@/Types/PostInfo.ts';

interface Props {
    commentInfoDtoList: CommentInfo[];
}

export default function CommentList({ commentInfoDtoList }: Props) {
    return (
        <ul className={'flex flex-col gap-y-2.5'}>
            {commentInfoDtoList.map(commentInfo => {
                return <CommentListItem key={commentInfo.id} commentInfo={commentInfo} />;
            })}
        </ul>
    );
}

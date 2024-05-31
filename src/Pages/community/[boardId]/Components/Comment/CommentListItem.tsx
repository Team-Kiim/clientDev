import type { CommentInfo } from '@/Types/PostInfo.ts';

interface Props {
    commentInfo: CommentInfo;
}

export default function CommentListItem({ commentInfo }: Props) {
    const { VITE_SERVER_URL } = import.meta.env;
    const { profileImagePath, profileImageName } = commentInfo;

    return (
        <li className={'flex flex-col border-b border-gray-300 py-3.5 last:border-none'}>
            <div className={'flex gap-x-4'}>
                <div className={'avatar my-1 size-7'}>
                    <img
                        className={'size-7 rounded-full'}
                        src={`${VITE_SERVER_URL}/image/${profileImagePath}/${profileImageName}`}
                        alt={profileImageName}
                    />
                </div>
                <div className={'flex flex-col gap-y-3'}>
                    <div className={'flex flex-col gap-y-0.5'}>
                        <span className={'text-[0.9rem] font-bold'}>{commentInfo.nickname}</span>
                        <span className={'text-[0.8rem] text-gray-500'}>
                            {commentInfo.createdTime[0]}년 {commentInfo.createdTime[1]}월 {commentInfo.createdTime[2]}일
                        </span>
                    </div>
                    <div className={'text-[0.93rem]'}>{commentInfo.content}</div>
                </div>
            </div>
        </li>
    );
}

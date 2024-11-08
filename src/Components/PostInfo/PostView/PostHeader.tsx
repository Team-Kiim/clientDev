import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko.js';
import { Link } from 'react-router-dom';
import { HiOutlineEye, HiOutlineHeart } from 'react-icons/hi2';
import PostControl from '@/Components/PostInfo/PostView/PostControl.tsx';
import formatNumber from '@/Utils/formatNumber.ts';

dayjs.extend(relativeTime);
dayjs.locale('ko');

interface Props {
    createdTime: number[];
    title: string;
    nickname: string;
    profileImageUrl: string;
    viewCount: number;
    likeCount: number;
    memberId: number;
    memberWritten: boolean;
    postId: number;
    postType: string;
}

export default function PostHeader({
    createdTime,
    title,
    nickname,
    profileImageUrl,
    viewCount,
    likeCount,
    memberId,
    memberWritten,
    postId,
    postType,
}: Props) {
    const createdDate = `${createdTime[0]}-${createdTime[1]}-${createdTime[2]} ${createdTime[3]}:${createdTime[4]}:${createdTime[5]}`;

    return (
        <header className={'flex flex-col gap-y-4'}>
            <div className={'flex items-center gap-x-3'}>
                <Link to={`/user/${memberId}`}>
                    <div className={'avatar'}>
                        <div className={'size-8 rounded-full'}>
                            <img src={profileImageUrl} alt={`${nickname}'s profile image`} />
                        </div>
                    </div>
                </Link>
                <div className={'flex flex-col gap-y-1'}>
                    <span className={'text-[0.9rem] font-bold'}>{nickname}</span>
                    <span className={'text-[0.8rem] text-slate-500'}>
                        {`${dayjs(createdDate).fromNow(true)} 전`} • {dayjs(createdDate).format('YYYY년 MM월 DD일')}
                    </span>
                </div>
            </div>
            <h1 className={'text-[1.7rem] font-extrabold'}>{title}</h1>
            <div className={'flex justify-end'}>
                <div className={'flex gap-x-3'}>
                    <div className={'flex items-center gap-x-1'}>
                        <HiOutlineEye className={'size-5 text-slate-800'} />
                        <span className={'text-[0.8rem] text-slate-800'}>{formatNumber(viewCount, 0)}</span>
                    </div>
                    <div className={'flex items-center gap-x-1'}>
                        <HiOutlineHeart className={'size-5 text-slate-800'} />
                        <span className={'text-[0.8rem] text-slate-800'}>{formatNumber(likeCount, 0)}</span>
                    </div>
                </div>
                {memberWritten && <PostControl postId={postId} postType={postType} />}
            </div>
        </header>
    );
}

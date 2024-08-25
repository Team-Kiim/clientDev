import { Link } from 'react-router-dom';
import { HiOutlineEye, HiOutlineHeart, HiOutlineCalendar } from 'react-icons/hi2';
import formatNumber from '@/Utils/formatNumber.ts';
import type { Post } from '@/Types/Post.ts';

interface Props {
    post: Post;
    postType: string;
}

export default function UserActivityPostListItem({ post, postType }: Props) {
    const { VITE_SERVER_URL } = import.meta.env;

    const {
        id,
        title,
        nickname,
        profileImagePath,
        profileImageName,
        imagePath,
        imageName,
        bodyContent,
        viewCount,
        likeCount,
        createdTime,
    } = post;

    return (
        <li className={'h-[19rem] rounded-lg border border-slate-200 transition-all hover:-translate-y-2'}>
            <Link to={`${postType === 'qnas' ? '/qnas' : '/community'}/${id}`}>
                <div className={'flex h-full flex-col'}>
                    {imagePath !== null && (
                        <div className={'w-full'}>
                            <img
                                className={'h-[8rem] w-full rounded-t-lg object-cover'}
                                src={imagePath}
                                alt={imageName}
                            />
                        </div>
                    )}
                    <div className={'mb-1 mt-2.5 flex items-center gap-x-1.5 px-3 text-slate-600'}>
                        <HiOutlineCalendar className={'size-3.5'} />
                        <span className={'text-[0.7rem]'}>
                            {`${createdTime[0]}년 ${createdTime[1]}월 ${createdTime[2]}일`}
                        </span>
                    </div>
                    <div className={'flex flex-1 flex-col gap-y-1.5 px-3.5'}>
                        <h3 className={'line-clamp-1 text-[0.9rem] font-bold'}>{title}</h3>
                        <p className={'line-clamp-2 text-[0.8rem] text-slate-400'}>
                            {bodyContent.replace(/<[^>]+>/g, '')}
                        </p>
                    </div>
                    <div className={'flex items-center justify-between rounded-b-lg px-3.5 py-2'}>
                        <div className={'flex items-center gap-x-2'}>
                            <div className={'avatar size-6'}>
                                <img className={'rounded-full'} src={profileImagePath} alt={profileImageName} />
                            </div>
                            <span className={'line-clamp-1 text-[0.8rem] font-bold text-slate-700'}>{nickname}</span>
                        </div>
                        <div className={'flex items-center gap-x-2'}>
                            <div className={'flex items-center gap-x-1'}>
                                <HiOutlineHeart className={'size-4 text-red-500'} />
                                <span className={'text-[0.75rem] font-bold'}>{formatNumber(likeCount, 0)}</span>
                            </div>
                            <div className={'flex items-center gap-x-1'}>
                                <HiOutlineEye className={'size-4 text-slate-600'} />
                                <span className={'text-[0.75rem] font-bold'}>{formatNumber(viewCount, 0)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    );
}

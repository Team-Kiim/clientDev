import { Link } from 'react-router-dom';
import { CalendarIcon, EyeIcon, HeartIcon } from '@heroicons/react/24/outline';
import formatNumber from '@/Utils/formatNumber.ts';
import type { Post } from '@/Types/PostTypes.ts';

interface Props {
    post: Post;
}

export default function PostListItem({ post }: Props) {
    const { id, title, username, profileImgSrc, bodyContent, viewCount, likeCount, createdTime, skillCategories } =
        post;

    return (
        <Link to={`/post/${id}`}>
            <div
                className={
                    'flex h-64 flex-col rounded-md border border-gray-200 shadow-md transition-all hover:-translate-y-2 hover:shadow-lg'
                }
            >
                <div className={'flex items-center gap-x-2 px-3.5 py-2 text-gray-500'}>
                    <CalendarIcon className={'size-4'} />
                    <span
                        className={'text-[0.82rem]'}
                    >{`${createdTime[0]}년 ${createdTime[1]}월 ${createdTime[2]}일`}</span>
                </div>
                <div className={'flex flex-1 flex-col gap-y-3 px-3.5'}>
                    <h1 className={'line-clamp-1 text-xl font-medium'}>{title}</h1>
                    <p className={'line-clamp-3 text-sm text-gray-500'}>{bodyContent}</p>
                </div>
                <div
                    className={
                        'flex items-center justify-between rounded-b-md border-t border-gray-200 bg-gray-50 px-3.5 py-2'
                    }
                >
                    <div className={'flex items-center gap-x-2'}>
                        <div className={'avatar size-7'}>
                            <img className={'rounded-full'} src={profileImgSrc} alt={'profileImgExample'} />
                        </div>
                        <span className={'text-[0.82rem] font-medium'}>{username}</span>
                    </div>
                    <div className={'flex items-center gap-x-4'}>
                        <div className={'flex items-center gap-x-1'}>
                            <HeartIcon className={'size-5 text-red-500'} />
                            <span className={'text-[0.8rem]'}>{formatNumber(likeCount, 0)}</span>
                        </div>
                        <div className={'flex items-center gap-x-1'}>
                            <EyeIcon className={'size-5 text-blue-500'} />
                            <span className={'text-[0.8rem]'}>{formatNumber(viewCount, 0)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

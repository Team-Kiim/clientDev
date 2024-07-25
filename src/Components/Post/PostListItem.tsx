import { Link } from 'react-router-dom';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { BiSolidLike } from 'react-icons/bi';
import { TiEye } from 'react-icons/ti';
import formatNumber from '@/Utils/formatNumber.ts';
import type { Post } from '@/Types/Post.ts';

interface Props {
    post: Post;
    postType: string;
}

export default function PostListItem({ post, postType }: Props) {
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
        <li
            className={
                'h-[26rem] rounded-md border border-gray-100 shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl'
            }
        >
            <Link to={`${postType === 'qnas' ? '/qnas' : '/community'}/${id}`}>
                <div className={'flex h-full flex-col'}>
                    <div className={'w-full'}>
                        <img
                            className={'h-[11rem] w-full rounded-t-md object-cover'}
                            src={`${VITE_SERVER_URL}/image/${imagePath}/${imageName}`}
                            alt={imageName}
                        />
                    </div>
                    <div className={'mb-1 mt-2.5 flex gap-x-1.5 px-3.5 text-gray-600'}>
                        <CalendarIcon className={'size-4'} />
                        <span
                            className={'text-[0.75rem]'}
                        >{`${createdTime[0]}년 ${createdTime[1]}월 ${createdTime[2]}일`}</span>
                    </div>
                    <div className={'flex flex-1 flex-col gap-y-1.5 px-3.5'}>
                        <h1 className={'line-clamp-1 text-lg font-bold'}>{title}</h1>
                        <p className={'line-clamp-4 text-[0.85rem] text-gray-500'}>
                            {bodyContent.replace(/<[^>]+>/g, '')}
                        </p>
                    </div>
                    <div
                        className={
                            'flex items-center justify-between rounded-b-md border-t border-gray-200 bg-gray-50 px-3.5 py-2'
                        }
                    >
                        <div className={'flex items-center gap-x-2'}>
                            <div className={'avatar size-7'}>
                                <img
                                    className={'rounded-full'}
                                    src={`${VITE_SERVER_URL}/image/${profileImagePath}/${profileImageName}`}
                                    alt={profileImageName}
                                />
                            </div>
                            <span className={'line-clamp-1 text-[0.82rem] font-bold'}>{nickname}</span>
                        </div>
                        <div className={'flex items-center gap-x-4'}>
                            <div className={'flex items-center gap-x-1'}>
                                <BiSolidLike className={'size-4 text-gray-700'} />
                                <span className={'text-[0.8rem] font-bold'}>{formatNumber(likeCount, 0)}</span>
                            </div>
                            <div className={'flex items-center gap-x-1'}>
                                <TiEye className={'size-5 text-gray-700'} />
                                <span className={'text-[0.8rem] font-bold'}>{formatNumber(viewCount, 0)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    );
}

import { Link } from 'react-router-dom';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { BiSolidLike } from 'react-icons/bi';
import { TiEye } from 'react-icons/ti';
import formatNumber from '@/Utils/formatNumber.ts';
import type { Post } from '@/Types/Post.ts';

interface Props {
    post: Post;
}

export default function PostListItem({ post }: Props) {
    const { id, title, userNickname, profileImgSrc, bodyContent, viewCount, likeCount, createdTime } = post;

    return (
        <li
            className={
                'h-[15.5rem] rounded-md border border-gray-100 shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl'
            }
        >
            <Link to={`/qnas/${id}`}>
                <div className={'flex h-full flex-col'}>
                    <div className={'flex items-center gap-x-2.5 px-3.5 py-2 text-gray-600'}>
                        <CalendarIcon className={'size-4'} />
                        <span
                            className={'text-[0.8rem]'}
                        >{`${createdTime[0]}년 ${createdTime[1]}월 ${createdTime[2]}일`}</span>
                    </div>
                    <div className={'flex flex-1 flex-col gap-y-3 px-3.5'}>
                        <h1 className={'line-clamp-1 text-lg font-bold'}>{title}</h1>
                        <p className={'line-clamp-4 text-sm text-gray-500'}>{bodyContent.replace(/<[^>]+>/g, '')}</p>
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
                            <span className={'text-[0.82rem] font-bold'}>{userNickname}</span>
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

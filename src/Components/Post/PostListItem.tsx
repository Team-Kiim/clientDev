import { Link } from 'react-router-dom';
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
        createdTime,
        likeCount,
        viewCount,
    } = post;

    return (
        <li className={'h-[22rem] rounded-3xl shadow-lg transition-all hover:-translate-y-2'}>
            <Link to={`/${postType}/${id}`}>
                <div className={'flex h-full w-full flex-col gap-y-3'}>
                    {imagePath !== null && (
                        <div className={'w-full'}>
                            <img
                                className={'h-40 w-full rounded-t-3xl object-cover'}
                                src={`${VITE_SERVER_URL}/image/${imagePath}/${imageName}`}
                                // src={imagePath}
                                alt={imageName}
                            />
                        </div>
                    )}
                    <div className={`flex w-full items-center gap-x-2 px-2 ${imagePath === null ? 'mt-3' : ''}`}>
                        <div className={'avatar size-8'}>
                            <img
                                className={'rounded-full'}
                                src={`${VITE_SERVER_URL}/image/${profileImagePath}/${profileImageName}`}
                                // src={profileImagePath}
                                alt={profileImageName}
                            />
                        </div>
                        <div className={'flex min-w-0 flex-1 flex-col'}>
                            <span className={'line-clamp-1 w-fit text-[0.8rem] font-bold text-neutral-800'}>
                                {nickname}
                            </span>
                            <span className={'w-fit text-[0.7rem] text-slate-500'}>
                                {createdTime[0]}년 {createdTime[1]}월 {createdTime[2]}일
                            </span>
                        </div>
                    </div>
                    <h2 className={'px-2 font-bold text-neutral-800'}>{title}</h2>
                    <div className={'flex-1 px-2'}>
                        <p
                            className={`${imagePath === null ? 'line-clamp-5' : 'line-clamp-3'} text-[0.75rem] leading-relaxed text-slate-500`}
                        >
                            {bodyContent.replace(/<[^>]+>/g, '')}
                        </p>
                    </div>
                    <div className={'flex items-center justify-end gap-x-3 px-4 pb-2'}>
                        <div className={'flex items-center gap-x-1'}>
                            <span className={'text-[0.7rem] text-slate-700'}>
                                조회수 : <span className={'font-bold'}>{formatNumber(viewCount, 0)}</span>
                            </span>
                        </div>
                        <div className={'flex items-center gap-x-1'}>
                            <span className={'text-[0.7rem] text-slate-700'}>
                                좋아요 : <span className={'font-bold'}>{formatNumber(likeCount, 0)}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    );
}

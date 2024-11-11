import { Link } from 'react-router-dom';
import SkillPost from '@/Types/skillPost.ts';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('ko');

interface Props {
    post: SkillPost;
}

export default function SkillPostListItem({ post }: Props) {
    const { postId, title, content, createdTime, profileImageUrl } = post;

    const createdDate = `${createdTime[0]}-${createdTime[1]}-${createdTime[2]} ${createdTime[3]}:${createdTime[4]}:${createdTime[5]}`;

    return (
        <li className={'border-b border-slate-200 p-3 transition-all last:border-none hover:bg-slate-100'}>
            <Link to={`/qnas/${postId}`}>
                <div className={'flex gap-x-3.5'}>
                    <div className={'avatar size-8 rounded-full'}>
                        <img className={'size-8 rounded-full'} src={profileImageUrl} alt={'profile img'} />
                    </div>
                    <div className={'flex flex-1 flex-col gap-y-2'}>
                        <div className={'flex justify-between'}>
                            <h2 className={'line-clamp-1 text-[0.9rem] font-extrabold'}>{title}</h2>
                            <span className={'text-[0.75rem] text-slate-400'}>
                                {`${dayjs(createdDate).fromNow(true)} 전`}
                            </span>
                        </div>
                        <p className={'line-clamp-2 text-[0.8rem] text-slate-500'}>{content.replace(/<[^>]+>/g, '')}</p>
                    </div>
                </div>
            </Link>
        </li>
    );
}

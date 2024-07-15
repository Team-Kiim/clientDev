import dayjs from 'dayjs';
import 'dayjs/locale/ko.js';
import { CalendarIcon } from '@heroicons/react/24/outline';

dayjs.locale('ko');

interface Props {
    createdTime: number[];
    title: string;
    nickname: string;
    profileImageName: string;
    profileImagePath: string;
    viewCount: number;
}

export default function PostMetaInfo({
    createdTime,
    title,
    nickname,
    profileImagePath,
    profileImageName,
    viewCount,
}: Props) {
    const { VITE_SERVER_URL } = import.meta.env;

    const createdDate = new Date(createdTime[0], createdTime[1] - 1, createdTime[2]);
    const createdWeekDay = dayjs(createdDate).format('dddd');

    return (
        <header className={'flex flex-col gap-y-4'}>
            <div className={'mx-0.5 flex items-center gap-x-1.5'}>
                <CalendarIcon className={'size-5 text-slate-500'} />
                <span className={'mx-1 text-[0.86rem] font-bold text-slate-500'}>
                    {`${createdWeekDay}  ·  ${createdTime[0]}년 ${createdTime[1]}월 ${createdTime[2]}일`}
                </span>
            </div>
            <h1 className={'line-clamp-1 text-[1.7rem] font-extrabold'}>{title}</h1>
            <div className={'flex items-center justify-between'}>
                <div className={'flex items-center gap-x-3'}>
                    <div className={'avatar'}>
                        <div className={'size-8 rounded-full'}>
                            <img
                                src={`${VITE_SERVER_URL}/image/${profileImagePath}/${profileImageName}`}
                                alt={profileImageName}
                            />
                        </div>
                    </div>
                    <span className={'text-[0.9rem] font-bold'}>{nickname}</span>
                </div>
                <div className={'text-[0.85rem] text-slate-500'}>
                    조회수 : <span>{viewCount.toLocaleString()}</span>
                </div>
            </div>
        </header>
    );
}

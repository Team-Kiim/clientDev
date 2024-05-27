import dayjs from 'dayjs';
import 'dayjs/locale/ko.js';
import { CalendarIcon } from '@heroicons/react/24/outline';
import formatNumber from '@/Utils/formatNumber.ts';

dayjs.locale('ko');

interface Props {
    createdTime: number[];
    title: string;
    nickname: string;
    profileImgPath: string;
    viewCount: number;
}

export default function PostMetaInfo({ createdTime, title, nickname, profileImgPath, viewCount }: Props) {
    const createdDate = new Date(createdTime[0], createdTime[1] - 1, createdTime[2]);
    const createdWeekDay = dayjs(createdDate).format('dddd');

    return (
        <header className={'flex flex-col gap-y-4'}>
            <div className={'mx-0.5 flex items-center gap-x-1.5'}>
                <CalendarIcon className={'size-5'} />
                <span className={'mx-1 text-[0.86rem] text-gray-600'}>
                    {`${createdWeekDay}, ${createdTime[0]}년 ${createdTime[1]}월 ${createdTime[2]}일`}
                </span>
            </div>
            <h1 className={'line-clamp-1 text-[1.7rem] font-bold'}>{title}</h1>
            <div className={'flex items-center justify-between'}>
                <div className={'flex items-center gap-x-3'}>
                    <div className={'avatar'}>
                        <div className={'size-8 rounded-full'}>
                            <img src={profileImgPath} alt={'profileImage'} />
                        </div>
                    </div>
                    <span className={'text-[0.9rem] font-bold tracking-wider'}>{nickname}</span>
                </div>
                <div className={'text-[0.9rem] text-gray-600'}>
                    조회수 : <span className={'font-bold'}>{formatNumber(viewCount, 0)}</span>
                </div>
            </div>
        </header>
    );
}

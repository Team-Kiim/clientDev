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
}

export default function PostMetaInfo({ createdTime, title, nickname, profileImageName, profileImagePath }: Props) {
    const { VITE_SERVER_URL } = import.meta.env;

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
            <h1 className={'text-[1.7rem] font-bold'}>{title}</h1>
            <div className={'flex items-center gap-x-3'}>
                <div className={'avatar'}>
                    <div className={'size-8 rounded-full'}>
                        <img
                            src={`${VITE_SERVER_URL}/image/${profileImagePath}/${profileImageName}`}
                            alt={profileImageName}
                        />
                    </div>
                </div>
                <span className={'text-[0.9rem] font-bold tracking-wider'}>{nickname}</span>
            </div>
        </header>
    );
}

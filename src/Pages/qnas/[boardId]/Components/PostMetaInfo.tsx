import dayjs from 'dayjs';
import 'dayjs/locale/ko.js';
dayjs.locale('ko');

interface Props {
    createdTime: number[];
    title: string;
    userNickname: string;
    profileImgSrc: string;
}

export default function PostMetaInfo({ createdTime, title, userNickname, profileImgSrc }: Props) {
    const createdDate = new Date(createdTime[0], createdTime[1] - 1, createdTime[2]);
    const createdWeekDay = dayjs(createdDate).format('dddd');

    return (
        <section className={'flex flex-col gap-y-3.5'}>
            <span className={'mx-1 text-[0.9rem] text-gray-500'}>
                {`${createdWeekDay}, ${createdTime[0]}년 ${createdTime[1]}월 ${createdTime[2]}일`}
            </span>
            <h1 className={'line-clamp-1 text-4xl font-bold'}>{title}</h1>
            <div className={'flex items-center gap-x-3'}>
                <div className={'avatar'}>
                    <div className={'size-10 rounded-full'}>
                        <img src={profileImgSrc} alt={'profileImage'} />
                    </div>
                </div>
                <span className={'text-[0.95rem] tracking-wider text-gray-700'}>{userNickname}</span>
            </div>
        </section>
    );
}

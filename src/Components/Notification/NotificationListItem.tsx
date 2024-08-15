import dayjs from 'dayjs';
import 'dayjs/locale/ko.js';
import relativeTime from 'dayjs/plugin/relativeTime';
import { faker } from '@faker-js/faker';
import { HiOutlineTrash } from 'react-icons/hi2';

dayjs.extend(relativeTime);

export default function NotificationListItem() {
    return (
        <li className={'flex h-20 w-full shrink-0 gap-x-3 rounded-lg bg-white p-3'}>
            <div className={'avatar'}>
                <div className={'size-8 rounded-full'}>
                    <img className={'size-10 rounded-full'} src={faker.image.avatar()} alt={'profileImg'} />
                </div>
            </div>
            <div className={'flex-1 shrink-0 flex-grow basis-0'}>
                <div className={'flex w-full flex-col gap-y-1'}>
                    <p className={'line-clamp-2 text-[0.8rem]'}>
                        <span className={'font-extrabold'}>kkangasdf1202</span>
                        님이 게시글에 댓글을 작성하였습니다.
                    </p>
                    <div className={'text-[0.75rem] font-bold text-slate-400'}>
                        <span>{dayjs('2024-7-10').fromNow(true)} 전</span>
                    </div>
                </div>
            </div>
            <div>
                <button className={'rounded-full p-1'} type={'button'}>
                    <HiOutlineTrash className={'size-5 text-neutral-800'} />
                </button>
            </div>
        </li>
    );
}

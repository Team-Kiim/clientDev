import dayjs from 'dayjs';
import 'dayjs/locale/ko.js';
import relativeTime from 'dayjs/plugin/relativeTime';
import { faker } from '@faker-js/faker';

dayjs.extend(relativeTime);

interface Props {
    updateCurrentViewName(viewName: string): void;
}

export default function ChatRoomListItem({ updateCurrentViewName }: Props) {
    return (
        <li
            className={
                'flex cursor-pointer items-center gap-x-3.5 border-b border-slate-200 px-4 py-3.5 transition-all last:border-none hover:bg-slate-50'
            }
        >
            <div className={'avatar size-10 rounded-full'}>
                <img className={'size-10 rounded-full'} src={faker.image.avatarGitHub()} alt={'thumbNailImg'} />
            </div>
            <div className={'flex flex-1 flex-col gap-y-1.5'}>
                <div className={'flex w-full items-center justify-between'}>
                    <h1 className={'text-[0.9rem] font-extrabold'}>채팅방 이름</h1>
                    <span className={'text-[0.7rem] font-bold text-slate-400'}>
                        {dayjs('20전24-7-10').fromNow(true)} 전
                    </span>
                </div>
                <div className={'flex justify-between'}>
                    <p className={'line-clamp-2 text-[0.75rem] text-slate-500'}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <div
                        className={
                            'flex size-4 shrink-0 items-center justify-center self-end rounded-full bg-gradient-to-br from-violet-600 to-purple-500 p-1.5 text-[0.65rem] font-bold text-white'
                        }
                    >
                        <span>{'3'}</span>
                    </div>
                </div>
            </div>
        </li>
    );
}

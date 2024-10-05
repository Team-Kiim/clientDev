import jsSvg from '@/assets/svgs/skillCategory/java_script.svg';
import { Link } from 'react-router-dom';

export default function ChatRoomListItem() {
    return (
        <li className={'border-b border-slate-300 last:border-none hover:bg-slate-50'}>
            <Link to={'/chat/java'}>
                <div className={'flex flex-col gap-y-4 p-4 transition-all'}>
                    <div className={'flex items-center gap-x-3'}>
                        <img className={'size-11 rounded-full object-contain'} src={jsSvg} alt={'js'} />
                        <div className={'flex flex-col'}>
                            <h2 className={'text-lg font-extrabold text-slate-800'}>JavaScript</h2>
                            <span className={'text-[0.73rem] text-slate-500'}>#프로그래밍 언어</span>
                        </div>
                    </div>
                    <div className={'flex w-full flex-1 flex-col '}>
                        <div className={'flex w-full gap-x-1 text-[0.8rem]'}>
                            <span className={'font-bold text-slate-600'}>asdf12</span>
                            <span className={'line-clamp-1 text-slate-800'}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,{' '}
                            </span>
                        </div>
                        <div className={'flex w-full gap-x-1 text-[0.8rem]'}>
                            <span className={'font-bold text-neutral-600'}>asdf12</span>
                            <span className={'line-clamp-1 text-slate-800'}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,{' '}
                            </span>
                        </div>
                    </div>
                    <div className={'flex items-center justify-end gap-x-2 text-slate-500'}>
                        <span className={'text-[0.7rem]'}>
                            <span className={'font-bold'}>500명</span> 참여 중
                        </span>
                        •<span className={'text-[0.7rem]'}>방금 전</span>
                    </div>
                </div>
            </Link>
        </li>
    );
}

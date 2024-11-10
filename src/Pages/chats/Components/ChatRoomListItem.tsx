import jsSvg from '@/assets/svgs/skillCategory/java_script.svg';
import { Link } from 'react-router-dom';
import { LuUsers2 } from 'react-icons/lu';
import type SkillChatRoom from '@/Types/skillChatRoom.ts';

type Props = SkillChatRoom;

export default function ChatRoomListItem({
    chatRoomId,
    parentSkillCategory,
    childSkillCategory,
    currentMemberSize,
}: Props) {
    return (
        <li className={'rounded-2xl border border-slate-200 p-4 transition-all hover:bg-slate-50'}>
            <Link to={`/chat/${chatRoomId}`}>
                <div className={'flex flex-col gap-y-4 transition-all'}>
                    <div className={'flex items-center gap-x-3'}>
                        <img className={'size-10 object-contain'} src={jsSvg} alt={'js'} />
                        <div className={'flex flex-col'}>
                            <h2 className={'text-[1.1rem] font-extrabold text-slate-800'}>{childSkillCategory}</h2>
                            <div className={'rounded-lg bg-plump-purple-50 px-1 py-0.5'}>
                                <span className={'text-[0.7rem] font-bold text-plump-purple-600'}>
                                    #{parentSkillCategory}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div
                        className={
                            'ml-auto flex w-fit items-center justify-end gap-x-2 rounded-lg bg-slate-100 px-1 py-0.5 text-slate-700'
                        }
                    >
                        <LuUsers2 className={'size-5'} />
                        <span className={'text-[0.7rem]'}>
                            <span className={'font-bold'}>{currentMemberSize}명</span> 참여 중
                        </span>
                    </div>
                </div>
            </Link>
        </li>
    );
}

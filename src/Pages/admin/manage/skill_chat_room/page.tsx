import { PiChatsTeardrop } from 'react-icons/pi';
import CreateSkillChatRoomForm from '@/Pages/admin/manage/skill_chat_room/Components/CreateSkillChatRoomForm.tsx';

export default function Page() {
    return (
        <>
            <div className={'mt-8 flex w-full min-w-[1500px] justify-center'}>
                <div className={'flex w-[62rem] flex-col gap-y-10'}>
                    <div className={'flex items-center gap-x-2'}>
                        <PiChatsTeardrop className={'size-6'} />
                        <h1 className={'text-lg font-extrabold'}>기술 채팅방 관리</h1>
                    </div>
                    <div className={'flex w-full gap-x-5'}>
                        <div className={'flex h-60 w-4/12 min-w-0 flex-col gap-y-5'}>
                            <h2 className={'mx-1 font-bold'}>기술 채팅방 생성</h2>
                            <hr />
                            <CreateSkillChatRoomForm />
                        </div>
                        <div className={'h-50 w-8/12 min-w-0 border'}></div>
                    </div>
                </div>
            </div>
        </>
    );
}

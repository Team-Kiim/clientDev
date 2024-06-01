import ToChatListButton from '@/Pages/chats/[roomId]/Components/ChatSection/ChatRoomControl/ToChatListButton.tsx';
import ChatRoomOutButton from '@/Pages/chats/[roomId]/Components/ChatSection/ChatRoomControl/ChatRoomOutButton.tsx';
import ChatBubbleList from '@/Pages/chats/[roomId]/Components/ChatSection/ChatBubbleList.tsx';
import ChatSendArea from '@/Pages/chats/[roomId]/Components/ChatSection/ChatSend/ChatSendArea.tsx';

export default function ChatView() {
    return (
        <div className={'col-span-4 my-8 flex h-[41rem] flex-col rounded-[1.6rem] border border-gray-200 shadow-xl'}>
            <section className={'flex items-center gap-x-3 px-6 py-3.5'}>
                <ToChatListButton />
                <h1 className={'flex-1 overflow-x-auto whitespace-nowrap font-extrabold scrollbar-hide'}>
                    Next.js 인터셉트 라우트에 대해서
                </h1>
                <ChatRoomOutButton />
            </section>
            <ChatBubbleList />
            <div className={'rounded-b-[1.6rem] px-6 py-3.5'}>
                <ChatSendArea />
            </div>
        </div>
    );
}

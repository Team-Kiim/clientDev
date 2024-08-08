import ChatRoomTop from '@/Components/MyChat/MyChatModal/ChatRoom/ChatRoomTop.tsx';
import ChatBubbleList from '@/Components/MyChat/MyChatModal/ChatRoom/ChatBubbleList.tsx';
import ChatSendSection from '@/Components/MyChat/MyChatModal/ChatRoom/ChatSendSection.tsx';

interface Props {
    chatRoomId: string | number;
    updateCurrentViewName(viewName: string): void;
}

export default function ChatRoom({ chatRoomId, updateCurrentViewName }: Props) {
    console.log(chatRoomId);

    return (
        <div className={'flex h-full flex-col gap-y-3 overflow-y-auto'}>
            <ChatRoomTop otherUserNickname={'kkangasdf'} updateCurrentViewName={updateCurrentViewName} />
            <ChatBubbleList />
            <ChatSendSection chatRoomId={chatRoomId} />
        </div>
    );
}

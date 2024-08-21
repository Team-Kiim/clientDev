import ChatRoomTop from '@/Pages/chats/[skillCategory]/Components/ChatRoom/ChatRoomTop.tsx';
import ChatBubbleList from '@/Pages/chats/[skillCategory]/Components/ChatRoom/ChatBubbleList.tsx';
import SendMessageSection from '@/Pages/chats/[skillCategory]/Components/ChatRoom/SendMessageSection.tsx';

interface Props {
    skillCategoryLabel: string;
    skillCategoryValue: string;
}

export default function ChatRoom({ skillCategoryLabel, skillCategoryValue }: Props) {
    return (
        <div className={'relative flex h-full flex-col gap-y-3 overflow-y-auto'}>
            <ChatRoomTop skillCategoryLabel={skillCategoryLabel} skillCategoryValue={skillCategoryValue} />
            <ChatBubbleList />
            <SendMessageSection />
        </div>
    );
}

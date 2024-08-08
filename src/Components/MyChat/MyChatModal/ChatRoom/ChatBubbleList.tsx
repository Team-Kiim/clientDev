import ChatBubbleListItem from '@/Components/MyChat/MyChatModal/ChatRoom/ChatBubbleListItem.tsx';
import { useEffect } from 'react';

export default function ChatBubbleList() {
    useEffect(() => {
        const $chatBubbleList = document.querySelector('.chatBubbleList');
        $chatBubbleList.scrollTop = $chatBubbleList.scrollHeight;
    }, []);

    return (
        <div
            className={
                'chatBubbleList flex shrink-0 flex-grow basis-0 flex-col gap-y-3 overflow-y-auto p-2 scrollbar-hide'
            }
        >
            <ChatBubbleListItem memberSent={true} messageType={''} />
            <ChatBubbleListItem memberSent={true} messageType={''} />
            <ChatBubbleListItem memberSent={false} messageType={''} />
            <ChatBubbleListItem memberSent={false} messageType={''} />
            <ChatBubbleListItem memberSent={false} messageType={''} />
            <ChatBubbleListItem memberSent={true} messageType={''} />
            <ChatBubbleListItem memberSent={true} messageType={''} />
            <ChatBubbleListItem memberSent={true} messageType={''} />
            <ChatBubbleListItem messageType={'ENTER'} />
            <ChatBubbleListItem memberSent={true} messageType={''} />
            <ChatBubbleListItem memberSent={false} messageType={''} />
            <ChatBubbleListItem memberSent={true} messageType={''} />
            <ChatBubbleListItem messageType={'EXIT'} />
        </div>
    );
}

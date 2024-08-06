import { useState } from 'react';
import ChatRoomFilter from '@/Components/MyChat/MyChatModal/Home/ChatRoomFilter.tsx';
import ChatRoomListItem from '@/Components/MyChat/MyChatModal/ChatRoomListItem.tsx';

export default function ChatRoomListWithFilter() {
    const [currentFilter, setCurrentFilter] = useState('all');

    const updateChatRoomFilter = (filter: string) => {
        setCurrentFilter(filter);
    };

    return (
        <div className={'flex flex-1 shrink-0 flex-grow flex-col gap-y-3 overflow-y-auto'}>
            <ChatRoomFilter currentFilter={currentFilter} updateChatRoomFilter={updateChatRoomFilter} />
            <div className={'flex flex-1 shrink-0 flex-grow flex-col overflow-y-auto overscroll-y-contain'}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(e => {
                    return <ChatRoomListItem key={e} />;
                })}
            </div>
        </div>
    );
}

import { Suspense, useState } from 'react';
import ChatRoomSearchInput from '@/Components/MyChat/MyChatModal/ChatSearch/ChatRoomSearchInput.tsx';
import SearchedChatRoomList from '@/Components/MyChat/MyChatModal/ChatSearch/SearchedChatRoomList.tsx';

interface Props {
    updateCurrentViewName(viewName: string): void;
}

export default function ChatSearchView({ updateCurrentViewName }: Props) {
    const [searchTerm, setSearchTerm] = useState('');

    const updateSearchTerm = (searchTerm: string) => {
        setSearchTerm(searchTerm);
    };

    return (
        <>
            <Suspense>
                <div className={'flex flex-col gap-y-3 overflow-y-auto'}>
                    <ChatRoomSearchInput updateSearchTerm={updateSearchTerm} />
                    <SearchedChatRoomList searchTerm={searchTerm} updateCurrentViewName={updateCurrentViewName} />
                </div>
            </Suspense>
        </>
    );
}

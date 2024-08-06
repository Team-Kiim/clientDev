import { Suspense } from 'react';
import ChatRoomListWithFilter from '@/Components/MyChat/MyChatModal/Home/ChatRoomListWithFilter.tsx';

export default function HomeView() {
    return (
        <>
            <Suspense>
                <ChatRoomListWithFilter />
            </Suspense>
        </>
    );
}

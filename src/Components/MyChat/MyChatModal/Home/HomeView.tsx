import { Suspense } from 'react';
import ChatRoomListWithFilter from '@/Components/MyChat/MyChatModal/Home/ChatRoomListWithFilter.tsx';

interface Props {
    updateCurrentViewName(viewName: string): void;
}

export default function HomeView({ updateCurrentViewName }: Props) {
    return (
        <>
            <Suspense>
                <ChatRoomListWithFilter updateCurrentViewName={updateCurrentViewName} />
            </Suspense>
        </>
    );
}

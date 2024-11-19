import { Suspense } from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import ChatRoomFilter from '@/Components/MyChat/MyChatModal/Home/ChatRoomFilter.tsx';
import ChatRoomListErrorFallback from '@/Components/MyChat/MyChatModal/Home/ChatRoomListErrorFallback.tsx';
import ChatRoomListLoading from '@/Components/MyChat/MyChatModal/Home/ChatRoomListLoading.tsx';
import ChatRoomList from '@/Components/MyChat/MyChatModal/Home/ChatRoomList.tsx';

interface Props {
    updateCurrentViewName(viewName: string): void;
}

export default function HomeView({ updateCurrentViewName }: Props) {
    const { reset } = useQueryErrorResetBoundary();

    return (
        <div className={'flex min-h-0 flex-1 flex-col gap-y-3 overflow-y-auto'}>
            <ChatRoomFilter />
            <ErrorBoundary
                FallbackComponent={ChatRoomListErrorFallback}
                onReset={() => {
                    reset();
                }}
            >
                <Suspense fallback={<ChatRoomListLoading />}>
                    <ChatRoomList updateCurrentViewName={updateCurrentViewName} />
                </Suspense>
            </ErrorBoundary>
        </div>
    );
}

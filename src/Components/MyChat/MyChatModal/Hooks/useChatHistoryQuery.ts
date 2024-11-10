import { useInfiniteQuery } from '@tanstack/react-query';
import fetchChatHistory from '@/Components/MyChat/MyChatModal/Utils/fetchChatHistory.ts';

export default function useChatHistoryQuery({ chatRoomId, enabled }: { chatRoomId: string; enabled: boolean }) {
    return useInfiniteQuery({
        queryKey: ['chatList', chatRoomId],
        queryFn: fetchChatHistory,
        initialPageParam: -1,
        // @ts-ignore
        getNextPageParam: lastPage => lastPage.at(-1)?.seqId,
        refetchOnMount: true,
        enabled,
        gcTime: 0,
    });
}

import { InfiniteData, useQueryClient, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import ChatRoomListItem from '@/Components/MyChat/MyChatModal/ChatRoomListItem.tsx';
import fetchChatRoomList from '@/Components/MyChat/MyChatModal/Utils/fetchChatRoomList.ts';
import useChatRoomFilterStore from '@/Stores/useChatRoomFilterStore.ts';
import InfiniteScroll from 'react-infinite-scroll-component';
import type ChatRoom from '@/Types/chatRoom.ts';
import { useNavigate } from 'react-router-dom';

interface Props {
    updateCurrentViewName(viewName: string): void;
}

export default function ChatRoomList({ updateCurrentViewName }: Props) {
    const { chatRoomFilter } = useChatRoomFilterStore(state => state);

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const { data, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery({
        queryKey: ['user', 'chatRoomList', { filter: chatRoomFilter }],
        queryFn: fetchChatRoomList,
        initialPageParam: 0,
        getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.length < 16 ? undefined : lastPageParam + 1),
        refetchOnMount: true,
        gcTime: Infinity,
    });

    const chatRoomList = data.pages.flat();

    const handleChatRoomListItemClick = ({
        chatRoomId,
        chatRoomType,
    }: {
        chatRoomId: string;
        chatRoomType: string;
    }) => {
        queryClient.setQueryData<InfiniteData<ChatRoom[]>>(
            ['user', 'chatRoomList', { filter: chatRoomFilter }],
            oldData => {
                return {
                    ...oldData,
                    pages: oldData.pages.map(page => {
                        return page.map(chatRoom => {
                            if (chatRoom.chatRoomId === chatRoomId) {
                                chatRoom.unreadMessageCount = 0;
                                return chatRoom;
                            } else {
                                return chatRoom;
                            }
                        });
                    }),
                };
            },
        );

        if (chatRoomType === 'TECH') {
            navigate(`/chat/${chatRoomId}`);
        }
    };

    return (
        <div
            id={'scrollableDiv'}
            className={'relative min-h-0 flex-1 overflow-y-auto overscroll-y-contain rounded-b-3xl scrollbar-hide'}
        >
            {chatRoomList.length !== 0 ? (
                <InfiniteScroll
                    next={fetchNextPage}
                    hasMore={hasNextPage}
                    loader={null}
                    dataLength={chatRoomList.length}
                >
                    <ul
                        className={
                            'flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain rounded-b-3xl scrollbar-hide'
                        }
                    >
                        {chatRoomList.map(chatRoom => {
                            return (
                                <ChatRoomListItem
                                    key={chatRoom.chatRoomId}
                                    chatRoomData={chatRoom}
                                    onChatRoomListItemClick={handleChatRoomListItemClick}
                                    updateCurrentViewName={updateCurrentViewName}
                                />
                            );
                        })}
                    </ul>
                </InfiniteScroll>
            ) : (
                <div className={'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center'}>
                    <p className={'text-[0.75rem] font-bold text-slate-400'}>
                        참여 중인 채팅방이 없습니다.
                        <br />
                        다른 사용자와 채팅을 시작해보세요.
                    </p>
                </div>
            )}
        </div>
    );
}

import { MessageEvent } from 'event-source-polyfill';
import { useEffect, useState } from 'react';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import MyChatModalTop from '@/Components/MyChat/MyChatModal/MyChatModalTop.tsx';
import HomeView from '@/Components/MyChat/MyChatModal/Home/HomeView.tsx';
import ChatSearchView from '@/Components/MyChat/MyChatModal/ChatSearch/ChatSearchView.tsx';
import ChatPlusVIew from '@/Components/MyChat/MyChatModal/ChatPlus/ChatPlusVIew.tsx';
import ChatRoom from '@/Components/MyChat/MyChatModal/ChatRoom/ChatRoom.tsx';
import useEventSourceStore from '@/Stores/useEventSourceStore.ts';
import useChatRoomFilterStore from '@/Stores/useChatRoomFilterStore.ts';
import type ChatRoomType from '@/Types/chatRoom.ts';

interface Props {
    updateIsButtonDisabled: (state: boolean) => void;
}

export default function MyChatModal({ updateIsButtonDisabled }: Props) {
    const queryClient = useQueryClient();

    const { eventSource } = useEventSourceStore(state => state);

    const { getChatRoomFilter } = useChatRoomFilterStore(state => state);

    const [currentViewName, setCurrentViewName] = useState('home');

    const updateCurrentViewName = (viewName: string) => {
        setCurrentViewName(viewName);
    };

    useEffect(() => {
        if (currentViewName.includes('chatRoom')) {
            updateIsButtonDisabled(true);
        } else {
            updateIsButtonDisabled(false);
        }
    }, [currentViewName]);

    useEffect(() => {
        const updateChatList = (event: MessageEvent) => {
            if (currentViewName.includes('chatRoomId')) {
                return;
            }

            const chatRoomInfoToUpdate = JSON.parse(event.data);
            const chatRoomFilter = getChatRoomFilter();

            if (!queryClient.getQueryData(['user', 'chatRoomList', { filter: chatRoomFilter }])) {
                return;
            }

            queryClient.setQueryData<InfiniteData<ChatRoomType[]>>(
                ['user', 'chatRoomList', { filter: chatRoomFilter }],
                oldData => {
                    let chatRoomToUpdate: ChatRoomType;

                    for (const page of oldData.pages) {
                        for (const chatRoom of page) {
                            if (chatRoom.chatRoomId === chatRoomInfoToUpdate.chatRoomId) {
                                chatRoomToUpdate = chatRoom;
                            }
                        }
                    }

                    oldData.pages = oldData.pages.map(page => {
                        return page.filter(chatRoom => chatRoom.chatRoomId !== chatRoomInfoToUpdate.chatRoomId);
                    });

                    chatRoomToUpdate.lastMessageContent = chatRoomInfoToUpdate.content;
                    chatRoomToUpdate.lastMessageTime = chatRoomInfoToUpdate.createdTime;
                    chatRoomToUpdate.unreadMessageCount = chatRoomToUpdate.unreadMessageCount + 1;

                    return {
                        ...oldData,
                        pages: oldData.pages.map((page, index) => {
                            if (index === 0) {
                                return [chatRoomToUpdate, ...page] as ChatRoomType[];
                            } else {
                                return page;
                            }
                        }),
                    };
                },
            );
        };

        eventSource.addEventListener('chat', updateChatList);

        return () => {
            eventSource.removeEventListener('chat', updateChatList);
        };
    }, []);

    useEffect(() => {
        return () => {
            queryClient.removeQueries({
                queryKey: ['user', 'chatRoomList'],
            });
        };
    }, []);

    return (
        <div
            className={
                'myChatModal absolute bottom-20 right-0 z-50 flex h-[38rem] w-[23rem] flex-col gap-y-4 rounded-3xl bg-white shadow-2xl'
            }
        >
            {!currentViewName.includes('chatRoom') && (
                <MyChatModalTop currentViewName={currentViewName} updateCurrentViewName={updateCurrentViewName} />
            )}
            {{
                home: <HomeView updateCurrentViewName={updateCurrentViewName} />,
                chatSearch: <ChatSearchView updateCurrentViewName={updateCurrentViewName} />,
                chatPlus: <ChatPlusVIew updateCurrentViewName={updateCurrentViewName} />,
            }[currentViewName] ?? (
                <ChatRoom
                    chatRoomId={currentViewName.split(' ')[0].split(':')[1]}
                    oppositeMemberId={
                        currentViewName.includes('oppositeMemberId')
                            ? currentViewName.split(' ')[1].split(':')[1]
                            : null
                    }
                    memberId={currentViewName.includes('memberId') ? currentViewName.split(' ')[1].split(':')[1] : null}
                    otherUserNickname={currentViewName.split(' ')[2].split(':')[1]}
                    updateCurrentViewName={updateCurrentViewName}
                />
            )}
        </div>
    );
}

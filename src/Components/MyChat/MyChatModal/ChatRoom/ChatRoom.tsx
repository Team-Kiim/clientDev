import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useEffect, useRef, useState } from 'react';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import ChatRoomTop from '@/Components/MyChat/MyChatModal/ChatRoom/ChatRoomTop.tsx';
import ChatBubbleList from '@/Components/MyChat/MyChatModal/ChatRoom/ChatBubbleList.tsx';
import ChatSendSection from '@/Components/MyChat/MyChatModal/ChatRoom/ChatSendSection.tsx';
import ModalBackground from '@/Components/UI/Modal/ModalBackground.tsx';
import LeaveTheChatWarningModal from '@/Components/MyChat/MyChatModal/ChatRoom/Modal/LeaveTheChatWarningModal.tsx';
import LeaveTheChatErrorModal from '@/Components/MyChat/MyChatModal/ChatRoom/Modal/LeaveTheChatErrorModal.tsx';
import useChatHistoryQuery from '@/Components/MyChat/MyChatModal/Hooks/useChatHistoryQuery.ts';
import useLeaveTheChat from '@/Components/MyChat/MyChatModal/Hooks/useLeaveTheChat.ts';
import type { Chat } from '@/Types/chat.ts';

interface Props {
    memberId?: string;
    oppositeMemberId?: string;
    chatRoomId: string;
    otherUserNickname: string;
    updateCurrentViewName(viewName: string): void;
}

export default function ChatRoom({
    memberId,
    chatRoomId,
    oppositeMemberId,
    otherUserNickname,
    updateCurrentViewName,
}: Props) {
    const clientRef = useRef<CompatClient>(null);

    const queryClient = useQueryClient();

    const [isConnectingToChatRoom, setIsConnectingToChatRoom] = useState(true);

    const [isConnectedToChatRoom, setIsConnectedToChatRoom] = useState(false);

    const [isConnectionFailed, setIsConnectionFailed] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isLeaveTheChatErrorOccurred, setIsLeaveTheChatErrorOccurred] = useState(false);

    const { data, isLoading, isSuccess, fetchNextPage, hasNextPage, refetch } = useChatHistoryQuery({
        enabled: isConnectedToChatRoom,
        chatRoomId,
    });

    const { mutate: leaveTheChat, isPending } = useLeaveTheChat({
        successCallback: () => {
            queryClient
                .invalidateQueries({
                    queryKey: ['user', 'chatRoomList'],
                    refetchType: 'all',
                })
                .catch();
            updateCurrentViewName('home');
        },

        errorCallback: () => {
            setIsModalOpen(true);
            setIsLeaveTheChatErrorOccurred(true);
        },
    });

    const chatList = data?.pages?.flat();

    const connectToChatRoom = () => {
        clientRef.current = Stomp.over(() => {
            // 웹 소캣 연결할 때만 하면됨, 이후 publish, subscribe 할 때는 프록시 필요 없음.
            // -> 이미 설정된 웹소켓 연결을 통해 이루어지므로, (웹소켓 통신 자체가 유지) 프록시 필요 없음.
            return new SockJS(`/api/wss`);
        });

        clientRef.current.debug = () => {};

        clientRef.current.connect(
            {},
            () => {
                setIsConnectedToChatRoom(true);
                setIsConnectingToChatRoom(false);
                clientRef.current.subscribe(`/sub/chat/${chatRoomId}`, message => {
                    const {
                        messageId,
                        messageType,
                        senderId,
                        senderNickname,
                        content,
                        createdTime,
                        profileImageUrl,
                    }: Chat = JSON.parse(message.body);
                    queryClient.setQueryData<InfiniteData<Chat[]>>(['chatList', chatRoomId], oldData => {
                        return {
                            ...oldData,
                            pages: oldData.pages.map((page, index) => {
                                if (index === 0) {
                                    return [
                                        {
                                            messageId,
                                            loginMember: memberId
                                                ? memberId === senderId.toString()
                                                : oppositeMemberId === senderId.toString(),
                                            chatRoomId,
                                            senderId,
                                            senderNickname,
                                            messageType,
                                            createdTime,
                                            content,
                                            profileImageUrl,
                                        },
                                        ...page,
                                    ] as Chat[];
                                } else {
                                    return page;
                                }
                            }),
                        };
                    });
                });
            },
            () => {
                // TODO 에러처리
                setIsConnectingToChatRoom(false);
                setIsConnectionFailed(true);
            },
        );
    };

    useEffect(() => {
        connectToChatRoom();
        return () => {
            if (clientRef.current) {
                clientRef.current.disconnect();
            }
        };
    }, []);

    return (
        <>
            <div className={'flex h-full flex-col overflow-y-auto'}>
                <div className={'relative flex h-full flex-col overflow-y-auto py-3'}>
                    <ChatRoomTop
                        chatRoomId={chatRoomId}
                        isConnectingToChatRoom={isConnectingToChatRoom}
                        otherUserNickname={otherUserNickname}
                        updateCurrentViewName={updateCurrentViewName}
                        openLeaveTheChatModal={() => {
                            setIsModalOpen(true);
                        }}
                        isLeavingTheChatRoom={isPending}
                    />
                    {isConnectingToChatRoom ? (
                        <div className={'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'}>
                            <span className={'loading loading-spinner loading-lg text-plump-purple-600'} />
                        </div>
                    ) : isConnectionFailed ? (
                        <div className={'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center'}>
                            <p className={'text-[0.75rem] font-bold text-slate-400'}>
                                채팅방에 연결할 수 없습니다. <br /> 잠시 후 다시 시도해주세요.
                            </p>
                        </div>
                    ) : isLoading ? (
                        <div className={'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'}>
                            <span className={'loading loading-spinner loading-lg text-plump-purple-600'} />
                        </div>
                    ) : isSuccess ? (
                        <>
                            <div
                                id={'scrollableDiv'}
                                style={{
                                    display: 'flex',
                                    overflowY: 'auto',
                                    flexGrow: 1,
                                    flexShrink: 0,
                                    flexBasis: 0,
                                    flexDirection: 'column-reverse',
                                }}
                            >
                                <InfiniteScroll
                                    scrollableTarget={'scrollableDiv'}
                                    next={fetchNextPage}
                                    hasMore={hasNextPage}
                                    loader={null}
                                    dataLength={data.pages.flat().length}
                                    style={{ display: 'flex', flexDirection: 'column-reverse' }}
                                    inverse
                                >
                                    <ChatBubbleList
                                        chatList={chatList}
                                        memberId={memberId}
                                        oppositeMemberId={oppositeMemberId}
                                    />
                                </InfiniteScroll>
                            </div>
                            <ChatSendSection client={clientRef.current} chatRoomId={chatRoomId} />
                            {isModalOpen && (
                                <ModalBackground className={'!rounded-3xl'}>
                                    {!isLeaveTheChatErrorOccurred ? (
                                        <LeaveTheChatWarningModal
                                            leaveTheChat={leaveTheChat}
                                            closeModal={() => {
                                                setIsModalOpen(false);
                                            }}
                                            chatRoomId={chatRoomId}
                                        />
                                    ) : (
                                        <LeaveTheChatErrorModal
                                            closeModal={() => {
                                                setIsModalOpen(false);
                                                setIsLeaveTheChatErrorOccurred(false);
                                            }}
                                        />
                                    )}
                                </ModalBackground>
                            )}
                        </>
                    ) : (
                        <div
                            className={
                                'absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-y-3 text-center'
                            }
                        >
                            <p className={'text-[0.75rem] font-bold text-slate-400'}>
                                채팅 목록을 불러올 수 없습니다. <br /> 잠시 후 다시 시도해주세요.
                            </p>
                            <button
                                className={
                                    'w-20 rounded-2xl bg-plump-purple-600 px-3 py-2 text-[0.75rem] font-bold text-white transition-all hover:bg-plump-purple-700'
                                }
                                onClick={() => {
                                    refetch();
                                }}
                                type={'button'}
                            >
                                다시 시도
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

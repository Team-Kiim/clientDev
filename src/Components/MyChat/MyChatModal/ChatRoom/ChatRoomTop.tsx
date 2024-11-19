import ky from 'ky';
import { useQueryClient } from '@tanstack/react-query';
import { GoChevronLeft, GoSignOut } from 'react-icons/go';

interface Props {
    chatRoomId: string;
    isConnectingToChatRoom: boolean;
    otherUserNickname: string;
    updateCurrentViewName(viewName: string): void;
    openLeaveTheChatModal(): void;
    isLeavingTheChatRoom: boolean;
}

export default function ChatRoomTop({
    chatRoomId,
    isConnectingToChatRoom,
    otherUserNickname,
    updateCurrentViewName,
    openLeaveTheChatModal,
    isLeavingTheChatRoom,
}: Props) {
    const queryClient = useQueryClient();

    const handleLeaveChatButtonClick = () => {
        openLeaveTheChatModal();
    };

    return (
        <div className={'flex items-center border-b border-slate-200 px-4 py-3'}>
            <button
                onClick={() => {
                    ky.patch(`/api/chat-room/close/${chatRoomId}`)
                        .catch()
                        .finally(() => {
                            queryClient
                                .invalidateQueries({
                                    queryKey: ['user', 'chatRoomList'],
                                    refetchType: 'all',
                                })
                                .catch();
                        });
                    updateCurrentViewName('home');
                }}
                type={'button'}
            >
                <GoChevronLeft className={'size-6 text-slate-800'} />
            </button>
            <div className={'flex flex-1 flex-col text-center'}>
                <span className={'line-clamp-1 font-extrabold text-neutral-800'}>{otherUserNickname}</span>
            </div>
            <button
                onClick={handleLeaveChatButtonClick}
                type={'button'}
                disabled={isLeavingTheChatRoom || isConnectingToChatRoom}
                className={'transition-all disabled:opacity-50'}
            >
                <GoSignOut className={'size-6 text-slate-800'} />
            </button>
        </div>
    );
}

import ChatRoomListItem from '@/Components/MyChat/MyChatModal/ChatRoomListItem.tsx';

interface Props {
    searchTerm: string;
    updateCurrentViewName(currentViewName: string): void;
}

export default function SearchedChatRoomList({ searchTerm, updateCurrentViewName }: Props) {
    console.log(searchTerm);

    return (
        <div className={'flex flex-1 shrink-0 flex-grow flex-col overflow-y-auto overscroll-y-contain'}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(e => {
                return <ChatRoomListItem key={e} updateCurrentViewName={updateCurrentViewName} />;
            })}
        </div>
    );
}

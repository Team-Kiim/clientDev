import { create } from 'zustand';

interface ChatRoomFilterStore {
    chatRoomFilter: string;
    setChatRoomFilter(chatRoomFilter: string): void;
    getChatRoomFilter(): string;
}

const useChatRoomFilterStore = create<ChatRoomFilterStore>((setState, getState) => {
    return {
        chatRoomFilter: 'oneOnOne',
        setChatRoomFilter: (chatRoomFilter: string) => {
            setState({
                chatRoomFilter,
            });
        },
        getChatRoomFilter: () => getState().chatRoomFilter,
    };
});

export default useChatRoomFilterStore;

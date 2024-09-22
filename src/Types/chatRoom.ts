type ChatRoom = {
    chatRoomId: number;
    chatRoomName: string;
    chatRoomType: 'DIRECT' | 'TECH';
    lastMessage: string;
    unreadMessageCount: number;
    lastMessageTime: number[];
    profileImageName: string;
    profileImagePath: string;
};

export default ChatRoom;

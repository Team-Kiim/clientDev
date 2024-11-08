type ChatRoom = {
    memberId: number;
    chatRoomId: number;
    chatRoomName: string;
    chatRoomType: 'DIRECT' | 'TECH';
    lastMessageContent: string;
    unreadMessageCount: number;
    lastMessageTime: number[];
    profileImageUrl: string;
};

export default ChatRoom;

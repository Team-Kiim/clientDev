type ChatRoom = {
    memberId: string;
    chatRoomId: string;
    chatRoomName: string;
    chatRoomType: 'DIRECT' | 'TECH';
    lastMessageContent: string;
    unreadMessageCount: number;
    lastMessageTime: number[];
    profileImageUrl: string;
};

export default ChatRoom;

export type Chat = {
    id: string;
    memberSent: boolean;
    chatRoomId: number;
    senderId: number;
    senderNickname: string;
    content: string;
    messageType: 'ENTER' | 'EXIT' | 'IMAGE' | 'CODE' | 'CHAT';
    createdTime: string;
    profileImagePath: string;
    profileImageName: string;
};

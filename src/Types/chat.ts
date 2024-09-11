export type Chat = {
    id: string;
    memberSent: boolean;
    chatRoomId: number;
    senderId: number;
    senderNickname: string;
    content: string;
    messageType: 'ENTER' | 'EXIT' | 'TALK' | 'IMAGE' | 'CODE';
    createdTime: number[];
};

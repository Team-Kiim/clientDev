export type Chat = {
    messageId: string;
    loginMember: boolean;
    senderId: number;
    senderNickname: string;
    content: string;
    messageType: 'ENTER' | 'EXIT' | 'IMAGE' | 'CODE' | 'CHAT';
    createdTime: number[] | string;
    profileImagePath: string;
    profileImageName: string;
};

export type Chat = {
    messageId: string;
    loginMember: boolean;
    senderId: string;
    senderNickname: string;
    content: string;
    messageType: 'ENTER' | 'EXIT' | 'IMAGE' | 'SOURCE_CODE' | 'TEXT';
    createdTime: number[] | string;
    profileImageUrl: string;
};

export type Notification = {
    id: string;
    senderId: string;
    senderNickname: string;
    profileImageUrl: string;
    postType: string | null;
    title: string;
    content: string;
    commentId: number | null;
    url: number;
    notificationType: 'COMMENT' | 'POST' | 'FOLLOW' | 'CORP';
    createdTime: number[];
    read: boolean;
};

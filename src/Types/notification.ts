export type Notification = {
    id: number;
    senderId: number;
    senderNickname: string;
    profileImagePath: string;
    profileImageName: string;
    postType: string | null;
    title: string;
    content: string;
    commentId: number | null;
    url: number;
    notificationType: 'COMMENT' | 'POST' | 'FOLLOW' | 'CORP';
    createdTime: number[];
    read: boolean;
};

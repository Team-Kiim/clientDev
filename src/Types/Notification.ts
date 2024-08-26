export type Notification = {
    id: number;
    senderId: number;
    senderNickname: string;
    profileImagePath: string;
    profileImageName: string;
    title: string;
    content: string;
    url: string;
    notificationType: string;
    createdTime: number[];
    read: boolean;
};

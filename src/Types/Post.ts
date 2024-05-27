export type Post = {
    id: number;
    title: string;
    nickname: string;
    profileImageName: string | null;
    profileImagePath: string | null;
    imageName: string | null;
    imagePath: string | null;
    bodyContent: string;
    viewCount: number;
    likeCount: number;
    createdTime: number[];
};

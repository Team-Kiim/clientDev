export type Post = {
    id: number;
    title: string;
    userNickname: string;
    profileImgSrc?: string;
    bodyContent: string;
    viewCount: number;
    likeCount: number;
    createdTime: number[];
    modifiedTime?: number[];
    skillCategories?: string[];
};

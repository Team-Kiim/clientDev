export type FileData = {
    id: number;
    originalFileName: string;
    saveFileName: string;
};

export type Post = {
    id: number;
    title: string;
    userNickname: string;
    profileImgSrc?: string;
    bodyContent: string;
    viewCount: number;
    isMemberLiked: boolean;
    likeCount: number;
    isBookmarked: boolean;
    createdTime: number[];
    modifiedTime?: number[];
    skillCategories?: string[];
};

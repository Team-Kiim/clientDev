export type Post = {
    id: number;
    title: string;
    userNickname: string;
    qnaType?: string;
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

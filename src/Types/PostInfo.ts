export type ImageInfo = {
    id: number;
    path: string;
    fileName: string;
};

export type CommentInfo = {
    id: number;
    content: string;
    nickname: string;
    createdTime: number[];
    modifiedTime?: number[] | null;
    profileImagePath?: string;
    profileImageName?: string;
};

export type PostInfo = {
    id: number;
    title: string;
    nickname: string;
    bodyContent: string;
    viewCount: number;
    likeCount: number;
    memberLiked: boolean;
    isMemberBookmarked: boolean;
    memberWritten: boolean;
    createdTime: number[];
    modifiedTime?: number[] | null;
    profileImagePath?: string;
    profileImageName?: string;
    imageFileInfoDtoList: ImageInfo[] | null;
};

export type QnAPostInfo = PostInfo & {
    skillCategoryList:
        | {
              parentSkillCategory: string;
              childSkillCategory: string;
          }[]
        | null;
};

export type CommunityPostInfo = PostInfo & {
    commentInfoDtoList: CommentInfo[] | null;
};

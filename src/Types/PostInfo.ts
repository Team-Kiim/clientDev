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
    profileImageUrl: string;
    memberWritten: boolean;
    memberId: number;
};

export type VoteInfo = {
    title: string;
    voteItemResponseList: {
        voteItemId: number;
        voteItemText: string;
        voteCount: number;
    }[];
    memberVoted: boolean;
};

export type PostInfo = {
    id: number;
    title: string;
    nickname: string;
    bodyContent: string;
    viewCount: number;
    likeCount: number;
    memberLiked: boolean;
    memberId: number;
    bookmarkCount: number;
    memberBookmarked: boolean;
    memberWritten: boolean;
    createdTime: number[];
    modifiedTime?: number[] | null;
    profileImageUrl: string;
    imageFileInfoDtoList: ImageInfo[] | null;
    commentInfoDtoList?: CommentInfo[];
    tagInfoDtoList: {
        id: number;
        content: string;
    }[];
};

export type QnAPostInfo = PostInfo & {
    skillCategoryList:
        | {
              parentSkillCategory: string;
              childSkillCategory: string;
          }[]
        | null;
    visualData?: string;
};

export type CommunityPostInfo = PostInfo & {
    voteResponse?: VoteInfo;
};

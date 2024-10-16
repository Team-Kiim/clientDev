export type User = {
    memberId: number;
    email: string;
    nickname: string;
    memberRole: string | null;
    isFollowingMember: boolean;
    interestSkillCategoryList:
        | {
              parentSkillCategory: string;
              childSkillCategory: string;
          }[]
        | null;
    isLoginMember: boolean;
    profileImageSrc: string;
    followedByLoginMember: boolean;
    corpName: string;
    corpVerified: boolean;
};

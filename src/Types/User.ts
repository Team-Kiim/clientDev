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
    loginMember: boolean;
    profileImagePath: string;
    profileImageName: string;
};

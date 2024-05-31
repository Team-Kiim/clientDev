export type User = {
    memberId: number;
    email: string;
    nickname: string;
    memberRole: string | null;
    interestSkillCategoryList:
        | {
              parentSkillCategory: string;
              childSkillCategory: string;
          }[]
        | null;
    isLoginMember: boolean;
    profileImagePath: string;
    profileImageName: string;
};

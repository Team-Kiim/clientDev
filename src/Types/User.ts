export type User = {
    memberId: string;
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
    profileImageUrl: string;
    followedByLoginMember: boolean;
    corpName: string;
    corpVerified: boolean;
    unreadNotificationCount: number;
};

import axios from 'axios';
import { faker } from '@faker-js/faker';
import { QueryFunction } from '@tanstack/react-query';
import type { User } from '@/Types/User.ts';

const testData: User = {
    memberId: 1,
    email: 'kangmin9814@gmail.com',
    nickname: 'kkangasdf',
    memberRole: null,
    interestSkillCategoryList: [
        {
            parentCategory: 'PROGRAMMING_LANGUAGE',
            childCategory: 'JAVA_SCRIPT',
        },
        {
            parentCategory: 'WEB',
            childCategory: 'REACT',
        },
        {
            parentCategory: 'WEB',
            childCategory: 'NEXT_JS',
        },
    ],
    isLoginMember: true,
    profileImageName: 'profileImage',
    profileImagePath: faker.image.avatar(),
};

const getUserData: QueryFunction<User, [_1: string]> = ({}) => {
    // const userNickname = queryKey[1];

    console.log('called');
    // return Promise.resolve(testData);
    return axios.get('/api/member/profile').then(response => response.data);
};

export default getUserData;

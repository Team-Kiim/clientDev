import axios from 'axios';
import { faker } from '@faker-js/faker';
import { QueryFunction } from '@tanstack/react-query';
import type { Post } from '@/Types/PostTypes.ts';

const testData: Post[] = [
    {
        id: 1,
        username: '김강민',
        profileImgSrc: faker.image.avatar(),
        title: '게시글 테스트 제목',
        bodyContent:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        viewCount: 1000,
        likeCount: 1000,
        createdTime: [2024, 4, 5],
        modifiedTime: [2024, 4, 5],
        skillCategories: ['JavaScript'],
    },
    {
        id: 2,
        username: '김강민',
        profileImgSrc: faker.image.avatar(),
        title: '게시글 테스트 제목',
        bodyContent:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        viewCount: 1000,
        likeCount: 1000,
        createdTime: [2024, 4, 5],
        modifiedTime: [2024, 4, 5],
        skillCategories: ['JavaScript'],
    },
    {
        id: 3,
        username: '김강민',
        profileImgSrc: faker.image.avatar(),
        title: '게시글 테스트 제목',
        bodyContent:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        viewCount: 1000,
        likeCount: 1000,
        createdTime: [2024, 4, 5],
        modifiedTime: [2024, 4, 5],
        skillCategories: ['JavaScript'],
    },
    {
        id: 4,
        username: '김강민',
        profileImgSrc: faker.image.avatar(),
        title: '게시글 테스트 제목',
        bodyContent:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        viewCount: 1000,
        likeCount: 1000,
        createdTime: [2024, 4, 5],
        modifiedTime: [2024, 4, 5],
        skillCategories: ['JavaScript'],
    },
    {
        id: 5,
        username: '김강민',
        profileImgSrc: faker.image.avatar(),
        title: '게시글 테스트 제목',
        bodyContent:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        viewCount: 1000,
        likeCount: 1000,
        createdTime: [2024, 4, 5],
        modifiedTime: [2024, 4, 5],
        skillCategories: ['JavaScript'],
    },
    {
        id: 6,
        username: '김강민',
        profileImgSrc: faker.image.avatar(),
        title: '게시글 테스트 제목',
        bodyContent:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        viewCount: 1000,
        likeCount: 1000,
        createdTime: [2024, 4, 5],
        modifiedTime: [2024, 4, 5],
        skillCategories: ['JavaScript'],
    },
    {
        id: 7,
        username: '김강민',
        profileImgSrc: faker.image.avatar(),
        title: '게시글 테스트 제목',
        bodyContent:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        viewCount: 1000,
        likeCount: 1000,
        createdTime: [2024, 4, 5],
        modifiedTime: [2024, 4, 5],
        skillCategories: ['JavaScript'],
    },
    {
        id: 8,
        username: '김강민',
        profileImgSrc: faker.image.avatar(),
        title: '게시글 테스트 제목',
        bodyContent:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        viewCount: 1000,
        likeCount: 1000,
        createdTime: [2024, 4, 5],
        modifiedTime: [2024, 4, 5],
        skillCategories: ['JavaScript'],
    },
    {
        id: 9,
        username: '김강민',
        profileImgSrc: faker.image.avatar(),
        title: '게시글 테스트 제목',
        bodyContent:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        viewCount: 1000,
        likeCount: 1000,
        createdTime: [2024, 4, 5],
        modifiedTime: [2024, 4, 5],
        skillCategories: ['JavaScript'],
    },
    {
        id: 10,
        username: '김강민',
        profileImgSrc: faker.image.avatar(),
        title: '게시글 테스트 제목',
        bodyContent:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        viewCount: 1000,
        likeCount: 1000,
        createdTime: [2024, 4, 5],
        modifiedTime: [2024, 4, 5],
        skillCategories: ['JavaScript'],
    },
];

const getPostList: QueryFunction<Post[], [_1: string, _3: { qnaType: string; title: string; keywords: string[] }]> = ({
    queryKey,
}) => {
    const { qnaType, title, keywords } = queryKey[1];
    console.log(qnaType, title, keywords);

    // return axios.get('/api/dev-posts').then(response => response.data);
    return Promise.resolve(testData);
};

export default getPostList;

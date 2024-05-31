import axios from 'axios';
import { faker } from '@faker-js/faker';
import { QueryFunction } from '@tanstack/react-query';
import type { CommunityPostInfo } from '@/Types/PostInfo.ts';

const testData: CommunityPostInfo = {
    id: 1,
    title: '커뮤니티 게시판 테스트',
    bodyContent: faker.lorem.text(),
    nickname: 'kkangasdf',
    viewCount: 1000,
    likeCount: 1000,
    createdTime: [2024, 12, 2],
    isMemberLiked: true,
    isMemberBookmarked: true,
    modifiedTime: null,
    profileImagePath: faker.image.avatar(),
    profileImageName: '프로필 사진',
    imageFileInfoDtoList: null,
    commentInfoDtoList: [
        {
            id: 1,
            content: 'ㅎㅇ요',
            nickname: 'kkangasdf',
            createdTime: [2024, 12, 2],
            profileImagePath: faker.image.avatar(),
            profileImageName: '프로필 사진',
        },
        {
            id: 2,
            content: '안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요',
            nickname: 'kkangasdf',
            createdTime: [2024, 12, 2],
            profileImagePath: faker.image.avatar(),
            profileImageName: '프로필 사진',
        },
        {
            id: 3,
            content: 'ㅎㅇ요',
            nickname: 'kkangasdf',
            createdTime: [2024, 12, 2],
            profileImagePath: faker.image.avatar(),
            profileImageName: '프로필 사진',
        },
    ],
};

const getSingleCommunityPostInfo: QueryFunction<CommunityPostInfo, [_1: string, _2: string]> = ({ queryKey }) => {
    const postId = queryKey[1];

    return axios.get(`/api/community-post/${postId}`).then(response => response.data);
    // return Promise.resolve(testData);
};

export default getSingleCommunityPostInfo;

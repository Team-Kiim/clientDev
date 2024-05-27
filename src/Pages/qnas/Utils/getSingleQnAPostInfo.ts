import { faker } from '@faker-js/faker';
import { QueryFunction } from '@tanstack/react-query';
import type { QnAPostInfo } from '@/Types/PostInfo.ts';

const testData: QnAPostInfo = {
    id: 1,
    title: 'QnA 게시판 테스트',
    bodyContent:
        '<p><strong>JavaScript</strong></p><p><span style="color:hsl(60, 75%, 60%);"><strong>JavaScript</strong></span></p><p><span style="color:hsl(210, 75%, 60%);"><strong>TypeScript</strong></span></p><pre><code class="language-typescript">import { omit, pick } from \'lodash\';\n' +
        "import { useParams } from 'react-router-dom';\n" +
        "import { useSuspenseQuery } from '@tanstack/react-query';\n" +
        "import PostDetails from '@/Pages/community/[boardId]/Components/PostDetails.tsx';\n" +
        "import PostInteraction from '@/Pages/Components/PostView/PostInteraction.tsx';\n" +
        "import CommentForm from '@/Pages/community/[boardId]/Components/Comment/CommentForm.tsx';\n" +
        "import CommentList from '@/Pages/community/[boardId]/Components/Comment/CommentList.tsx';\n" +
        "import getSingleCommunityPostInfo from '@/Pages/community/Utils/getSingleCommunityPostInfo.ts';\n" +
        '\n' +
        'export default function PostView() {\n' +
        '    const postId = useParams().postId;\n' +
        '\n' +
        '    const { data } = useSuspenseQuery({\n' +
        "        queryKey: ['post', postId],\n" +
        '        queryFn: getSingleCommunityPostInfo,\n' +
        '    });\n' +
        '\n' +
        '    return (\n' +
        "        &lt;div className={'col-span-7 col-start-2'}&gt;\n" +
        '            &lt;PostDetails\n' +
        '                {...omit(data, [\n' +
        "                    'likeCount',\n" +
        "                    'isMemberLiked',\n" +
        "                    'isMemberBookmarked',\n" +
        "                    'imageFileInfoDtoList',\n" +
        "                    'commentInfoDtoList',\n" +
        '                ])}\n' +
        '            /&gt;\n' +
        "            &lt;PostInteraction {...pick(data, ['isMemberLiked', 'likeCount', 'isMemberBookmarked'])} postId={postId} /&gt;\n" +
        "            &lt;div className={'my-5'}&gt;\n" +
        '                &lt;CommentForm /&gt;\n' +
        '                &lt;CommentList commentInfoDtoList={data.commentInfoDtoList} /&gt;\n' +
        '            &lt;/div&gt;\n' +
        '        &lt;/div&gt;\n' +
        '    );\n' +
        '}</code></pre><ul><li>C</li><li>C++</li><li>CPP</li></ul>',
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
    skillCategories: [
        {
            parentCategory: 'PROGRAMMING_LANGUAGE',
            childCategory: 'JavaScript',
        },
        {
            parentCategory: 'PROGRAMMING_LANGUAGE',
            childCategory: 'TypeScript',
        },
        {
            parentCategory: 'WEB',
            childCategory: 'Next.js',
        },
    ],
};

const getSingleQnAPostInfo: QueryFunction<QnAPostInfo, [_1: string, _2: string]> = ({ queryKey }) => {
    const postId = queryKey[1];
    console.log(postId);

    return Promise.resolve(testData);
};

export default getSingleQnAPostInfo;

import axios from 'axios';
import { faker } from '@faker-js/faker';
import { QueryFunction } from '@tanstack/react-query';
import type { Post } from '@/Types/Post.ts';

const testData: Post[] = [
    {
        id: 1,
        nickname: 'kkangasdf',
        profileImageName: '프로필 사진',
        profileImagePath: faker.image.avatar(),
        imagePath: faker.image.urlLoremFlickr(),
        imageName: '배경 이미지',
        title: '게시글 테스트 제목',
        bodyContent:
            '<pre><code class="language-typescript">import dayjs from \'dayjs\';\n' +
            "import 'dayjs/locale/ko.js';\n" +
            "dayjs.locale('ko');\n" +
            '\n' +
            'interface Props {\n' +
            '    createdTime: number[];\n' +
            '    title: string;\n' +
            '    userNickname: string;\n' +
            '    profileImgSrc: string;\n' +
            '}\n' +
            '\n' +
            'export default function PostMetaInfo({ createdTime, title, userNickname, profileImgSrc }: Props) {\n' +
            '    const createdDate = new Date(createdTime[0], createdTime[1] - 1, createdTime[2]);\n' +
            "    const createdWeekDay = dayjs(createdDate).format('dddd');\n" +
            '\n' +
            '    return (\n' +
            "        &lt;section className={'flex flex-col gap-y-3.5'}&gt;\n" +
            "            &lt;span className={'mx-1 text-[0.9rem] text-gray-500'}&gt;\n" +
            '                {`${createdWeekDay}, ${createdTime[0]}년 ${createdTime[1]}월 ${createdTime[2]}일`}\n' +
            '            &lt;/span&gt;\n' +
            "            &lt;h1 className={'line-clamp-1 text-4xl font-bold'}&gt;{title}&lt;/h1&gt;\n" +
            "            &lt;div className={'flex items-center gap-x-3'}&gt;\n" +
            "                &lt;div className={'avatar'}&gt;\n" +
            "                    &lt;div className={'size-10 rounded-full'}&gt;\n" +
            "                        &lt;img src={profileImgSrc} alt={'profileImage'} /&gt;\n" +
            '                    &lt;/div&gt;\n' +
            '                &lt;/div&gt;\n' +
            "                &lt;span className={'text-[0.95rem] tracking-wider text-gray-700'}&gt;{userNickname}&lt;/span&gt;\n" +
            '            &lt;/div&gt;\n' +
            '        &lt;/section&gt;\n' +
            '    );\n' +
            '}</code></pre><p>&nbsp;</p><pre><code class="language-nginx">user nginx;\n' +
            'worker_processes auto;\n' +
            '\n' +
            'error_log  /var/log/nginx/error.log warn;\n' +
            'pid        /var/run/nginx.pid;\n' +
            'events {\n' +
            '    worker_connections  1024;\n' +
            '}\n' +
            '\n' +
            'http {\n' +
            '    include       /etc/nginx/mime.types;\n' +
            '    default_type  application/octet-stream;\n' +
            '    client_max_body_size 10M;\n' +
            '\n' +
            '    upstream backend {\n' +
            '        server backend_container:8080;      # docker-compose.yml에서 올라가는 컨테이너명으로 작성.\n' +
            '        keepalive 1024;\n' +
            '    }\n' +
            '\n' +
            '    server {\n' +
            '        listen 80;              # nginx를 통해 외부로 노출되는 port\n' +
            '\n' +
            '        location / {\n' +
            '            # root를 /usr/share/nginx/html 을 바라보게 했으므로(Dockerfile 참고)\n' +
            '            # 해당 경로 아래에 배포해주면 됨\n' +
            '            root   /usr/share/nginx/html;\n' +
            '            index  index.html;\n' +
            '            try_files $uri /index.html;\n' +
            '        }\n' +
            '\n' +
            '        location /api {\n' +
            '           rewrite ^/api(.*)$ $1?$args break;\n' +
            '           proxy_pass         http://backend;\n' +
            '        }\n' +
            '\n' +
            '\n' +
            '    }\n' +
            '    log_format  main  \'$remote_addr - $remote_user [$time_local] "$request" \'\n' +
            '                      \'$status $body_bytes_sent "$http_referer" \'\n' +
            '                      \'"$http_user_agent" "$http_x_forwarded_for"\';\n' +
            '    access_log  /var/log/nginx/access.log  main;\n' +
            '\n' +
            '    sendfile        on;\n' +
            '    keepalive_timeout  65;\n' +
            '\n' +
            '}</code></pre><p>&nbsp;</p><pre><code class="language-docker">FROM node:alpine as builder\n' +
            '\n' +
            'WORKDIR /usr/src/app\n' +
            '\n' +
            'COPY package.json .\n' +
            '\n' +
            'RUN yarn install\n' +
            '\n' +
            'COPY ./ ./\n' +
            '\n' +
            'RUN yarn build\n' +
            '\n' +
            'FROM nginx\n' +
            'EXPOSE 80\n' +
            'COPY --from=builder /usr/src/app/dist /usr/share/nginx/html\n' +
            '\n' +
            'RUN rm /etc/nginx/conf.d/default.conf\n' +
            '\n' +
            '# custom 설정파일을 컨테이너 내부로 복사한다.\n' +
            'COPY ./nginx.conf /etc/nginx/nginx.conf</code></pre><h2>테스트1</h2><h3>테스트2</h3><h4>테스트3</h4><p>&nbsp;</p><p>안녕</p><p><strong>안녕</strong></p><p><i>안녕</i></p><p><u>안녕</u></p><p><span style="color:hsl(0, 75%, 60%);">안녕</span></p><blockquote><p>안녕하세요.</p></blockquote><p><a href="http://nnet.cbnu.ac.kr/">http://nnet.cbnu.ac.kr/</a></p><hr><p><code>console.log(\'hello world!\');</code></p><ul><li>d</li><li>d</li></ul><ol><li>d</li><li>d</li></ol><p>정렬 테스트1</p><p style="text-align:right;">정렬테스트2</p><p style="text-align:center;">정렬테스트3</p><p style="text-align:justify;">정렬테스트4</p>',
        viewCount: 1000,
        likeCount: 1000,
        createdTime: [2024, 4, 5],
    },
    {
        id: 2,
        nickname: 'kkangasdf',
        profileImageName: '프로필 사진',
        profileImagePath: faker.image.avatar(),
        imagePath: faker.image.urlLoremFlickr(),
        imageName: '배경 이미지',
        title: '게시글 테스트 제목',
        bodyContent:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        viewCount: 1000,
        likeCount: 1000,
        createdTime: [2024, 4, 5],
    },
    {
        id: 3,
        nickname: 'kkangasdf',
        profileImageName: '프로필 사진',
        profileImagePath: faker.image.avatar(),
        imagePath: faker.image.urlLoremFlickr(),
        imageName: '배경 이미지',
        title: '게시글 테스트 제목',
        bodyContent:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        viewCount: 1000,
        likeCount: 1000,
        createdTime: [2024, 4, 5],
    },
    {
        id: 4,
        nickname: 'kkangasdf',
        profileImageName: '프로필 사진',
        profileImagePath: faker.image.avatar(),
        imagePath: faker.image.urlLoremFlickr(),
        imageName: '배경 이미지',
        title: '게시글 테스트 제목',
        bodyContent:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        viewCount: 1000,
        likeCount: 1000,
        createdTime: [2024, 4, 5],
    },
    {
        id: 5,
        nickname: 'kkangasdf',
        profileImageName: '프로필 사진',
        profileImagePath: faker.image.avatar(),
        imagePath: faker.image.urlLoremFlickr(),
        imageName: '배경 이미지',
        title: '게시글 테스트 제목',
        bodyContent:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        viewCount: 1000,
        likeCount: 1000,
        createdTime: [2024, 4, 5],
    },
    {
        id: 6,
        nickname: 'kkangasdf',
        profileImageName: '프로필 사진',
        profileImagePath: faker.image.avatar(),
        imagePath: faker.image.urlLoremFlickr(),
        imageName: '배경 이미지',
        title: '게시글 테스트 제목',
        bodyContent:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        viewCount: 1000,
        likeCount: 1000,
        createdTime: [2024, 4, 5],
    },
    {
        id: 7,
        nickname: 'kkangasdf',
        profileImageName: '프로필 사진',
        profileImagePath: faker.image.avatar(),
        imagePath: faker.image.urlLoremFlickr(),
        imageName: '배경 이미지',
        title: '게시글 테스트 제목',
        bodyContent:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        viewCount: 1000,
        likeCount: 1000,
        createdTime: [2024, 4, 5],
    },
    {
        id: 8,
        nickname: 'kkangasdf',
        profileImageName: '프로필 사진',
        profileImagePath: faker.image.avatar(),
        imagePath: faker.image.urlLoremFlickr(),
        imageName: '배경 이미지',
        title: '게시글 테스트 제목',
        bodyContent:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        viewCount: 1000,
        likeCount: 1000,
        createdTime: [2024, 4, 5],
    },
    {
        id: 9,
        nickname: 'kkangasdf',
        profileImageName: '프로필 사진',
        profileImagePath: faker.image.avatar(),
        imagePath: faker.image.urlLoremFlickr(),
        imageName: '배경 이미지',
        title: '게시글 테스트 제목',
        bodyContent:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        viewCount: 1000,
        likeCount: 1000,
        createdTime: [2024, 4, 5],
    },
    {
        id: 10,
        nickname: 'kkangasdf',
        profileImageName: '프로필 사진',
        profileImagePath: faker.image.avatar(),
        imagePath: faker.image.urlLoremFlickr(),
        imageName: '배경 이미지',
        title: '게시글 테스트 제목',
        bodyContent:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        viewCount: 1000,
        likeCount: 1000,
        createdTime: [2024, 4, 5],
    },
];

const getPostList: QueryFunction<Post[], [_1: string, _3: { postType: string; title: string; keywords: string[] }]> = ({
    queryKey,
}) => {
    const { postType, title, keywords } = queryKey[1];
    console.log(postType, title, keywords);

    // return axios.get('/api/dev-posts').then(response => response.data);
    return Promise.resolve(testData);
};

export default getPostList;

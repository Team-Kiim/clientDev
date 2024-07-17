import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import AppLayout from '@/layout.tsx';
import MainPage from '@/Pages/page.tsx';
import QnAPostListPage from '@/Pages/qnas/page.tsx';
import CommunityPostListPage from '@/Pages/community/page.tsx';
import CommunityPostPage from '@/Pages/community/[boardId]/page.tsx';
import SignInPage from '@/Pages/sign_in/page.tsx';
import SignUpPage from '@/Pages/sign_up/page.tsx';
import NaverRedirect from '@/Components/Auth/OAuthSection/NaverSection/NaverRedirect.tsx';
import KakaoRedirect from '@/Components/Auth/OAuthSection/KakaoSection/KakaoRedirect.tsx';
import QnAPostPage from '@/Pages/qnas/[boardId]/page.tsx';
import QnAWritePage from '@/Pages/qnas/write/page.tsx';
import QnAEditPage from '@/Pages/qnas/edit/[postId]/page.tsx';

import CommunityPostWritePage from '@/Pages/community/write/page.tsx';
import ChatRoomPage from '@/Pages/chats/[roomId]/page.tsx';
import UserPageLayout from '@/Pages/user/Components/UserPageLayout.tsx';
import UserProfilePage from '@/Pages/user/page.tsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AppLayout />}>
            <Route>
                <Route element={<MainPage />} path={'/'} />
                <Route element={<QnAPostListPage />} path={'/qnas'} />
                <Route element={<CommunityPostListPage />} path={'/community'} />
                <Route element={<SignInPage />} path={'/sign_in'} />
                <Route element={<SignUpPage />} path={'/sign_up'} />
                <Route element={<NaverRedirect />} path={'/oauth/naver'} />
                <Route element={<KakaoRedirect />} path={'/oauth/kakao'} />
            </Route>
            <Route>
                <Route element={<>Q&A</>} path={'/qnas'} />
                <Route element={<QnAPostPage />} path={'/qnas/:postId'} />
                <Route element={<QnAWritePage />} path={'/qnas/write'} />
                <Route element={<QnAEditPage />} path={'/qnas/edit/:postId'} />
                <Route element={<CommunityPostPage />} path={'/community/:postId'} />
                <Route element={<CommunityPostWritePage />} path={'/community/write'} />
                <Route element={<ChatRoomPage />} path={'/chats/:roomId'} />
                <Route element={<UserPageLayout />} path={'/user/:profileMemberId?'}>
                    <Route element={<UserProfilePage />} index />
                    <Route element={<UserProfilePage />} path={'profile'} />
                    <Route element={<>게시글</>} path={'post'} />
                    <Route element={<>채팅</>} path={'chat'} />
                    <Route element={<>계정</>} path={'account'} />
                </Route>
            </Route>
        </Route>,
    ),
);

export default router;

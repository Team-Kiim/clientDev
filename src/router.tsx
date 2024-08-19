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
import GoogleRedirect from '@/Components/Auth/OAuthSection/GoogleSection/GoogleRedirect.tsx';
import QnAPostPage from '@/Pages/qnas/[boardId]/page.tsx';
import QnAWritePage from '@/Pages/qnas/write/page.tsx';
import QnAEditPage from '@/Pages/qnas/edit/page.tsx';

import CommunityPostWritePage from '@/Pages/community/write/page.tsx';
import CommunityPostEditPage from '@/Pages/community/edit/page.tsx';
import UserPageLayout from '@/Pages/user/Components/UserPageLayout.tsx';
import UserProfilePage from '@/Pages/user/page.tsx';
import UserSocialPage from '@/Pages/user/social/page.tsx';
import UserPostsPage from '@/Pages/user/posts/page.tsx';
import UserAccountPage from '@/Pages/user/account/page.tsx';

import NotFoundErrorPage from '@/Pages/ErrorPages/NotFoundErrorPage.tsx';

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
                <Route element={<GoogleRedirect />} path={'/oauth/google'} />
            </Route>
            <Route>
                <Route element={<>Q&A</>} path={'/qnas'} />
                <Route element={<QnAPostPage />} path={'/qnas/:postId'} />
                <Route element={<QnAWritePage />} path={'/qnas/write'} />
                <Route element={<QnAEditPage />} path={'/qnas/edit/:postId'} />
                <Route element={<CommunityPostPage />} path={'/community/:postId'} />
                <Route element={<CommunityPostWritePage />} path={'/community/write'} />
                <Route element={<CommunityPostEditPage />} path={'/community/edit/:postId'} />
                <Route element={<UserPageLayout />} path={'/user/:profileMemberId?'}>
                    <Route element={<UserProfilePage />} index />
                    <Route element={<UserProfilePage />} path={'profile'} />
                    <Route element={<UserSocialPage />} path={'social'} />
                    <Route element={<UserPostsPage />} path={'post'} />
                    <Route element={<UserAccountPage />} path={'account'} />
                </Route>
            </Route>
            <Route element={<NotFoundErrorPage />} path={'*'} />
        </Route>,
    ),
);

export default router;

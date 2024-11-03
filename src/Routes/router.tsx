import { createBrowserRouter } from 'react-router-dom';

import PublicRoute from '@/Routes/PublicRoute.tsx';
import PrivateRoute from '@/Routes/PrivateRoute.tsx';

import AppLayout from '@/layout.tsx';
import MainPage from '@/Pages/page.tsx';

import SignInPage from '@/Pages/sign_in/page.tsx';
import SignUpPage from '@/Pages/sign_up/page.tsx';
import NaverRedirect from '@/Components/Auth/OAuthSection/NaverSection/NaverRedirect.tsx';
import KakaoRedirect from '@/Components/Auth/OAuthSection/KakaoSection/KakaoRedirect.tsx';
import GoogleRedirect from '@/Components/Auth/OAuthSection/GoogleSection/GoogleRedirect.tsx';

import QnAPostListPage from '@/Pages/qnas/page.tsx';
import QnAPostPage from '@/Pages/qnas/[boardId]/page.tsx';
import WriteQnAPostPage from '@/Pages/qnas/write/page.tsx';
import EditQnAPostPage from '@/Pages/qnas/edit/page.tsx';

import CommunityPostListPage from '@/Pages/community/page.tsx';
import CommunityPostPage from '@/Pages/community/[boardId]/page.tsx';
import WriteCommunityPostPage from '@/Pages/community/write/page.tsx';
import EditCommunityPostPage from '@/Pages/community/edit/page.tsx';

import UserPageLayout from '@/Pages/user/Components/UserPageLayout.tsx';
import UserProfilePage from '@/Pages/user/page.tsx';
import UserSocialPage from '@/Pages/user/social/page.tsx';
import UserPostsPage from '@/Pages/user/posts/page.tsx';
import UserAccountPage from '@/Pages/user/account/page.tsx';

import AdminPageLayout from '@/Pages/admin/Components/AdminPageLayout.tsx';
import ManageDomainPage from '@/Pages/admin/manage/domain/page.tsx';

import NotFoundErrorPage from '@/Pages/ErrorPages/NotFoundErrorPage.tsx';

const { VITE_ADMIN_SECRET_KEY } = import.meta.env;

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <NotFoundErrorPage />,
        children: [
            {
                element: <PublicRoute />,
                children: [
                    {
                        index: true,
                        element: <MainPage />,
                    },
                    {
                        path: 'sign_in',
                        element: <SignInPage />,
                    },
                    {
                        path: 'sign_up',
                        element: <SignUpPage />,
                    },
                    {
                        path: 'oauth/naver',
                        element: <NaverRedirect />,
                    },
                    {
                        path: 'oauth/kakao',
                        element: <KakaoRedirect />,
                    },
                    {
                        path: 'oauth/google',
                        element: <GoogleRedirect />,
                    },
                    {
                        path: 'qnas',
                        element: <QnAPostListPage />,
                    },
                    {
                        path: 'qnas/:postId',
                        element: <QnAPostPage />,
                    },
                    {
                        path: 'community',
                        element: <CommunityPostListPage />,
                    },
                    {
                        path: 'community/:postId',
                        element: <CommunityPostPage />,
                    },
                ],
            },
            {
                element: <PrivateRoute />,
                children: [
                    {
                        path: 'qnas/write',
                        element: <WriteQnAPostPage />,
                    },
                    {
                        path: 'qnas/edit/:postId',
                        element: <EditQnAPostPage />,
                    },
                    {
                        path: 'community/write',
                        element: <WriteCommunityPostPage />,
                    },
                    {
                        path: 'community/edit/:postId',
                        element: <EditCommunityPostPage />,
                    },
                    {
                        path: 'user/:profileMemberId?',
                        element: <UserPageLayout />,
                        children: [
                            {
                                index: true,
                                element: <UserProfilePage />,
                            },
                            {
                                path: 'profile',
                                element: <UserProfilePage />,
                            },
                            {
                                path: 'social',
                                element: <UserSocialPage />,
                            },
                            {
                                path: 'post',
                                element: <UserPostsPage />,
                            },
                            {
                                path: 'account',
                                element: <UserAccountPage />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: `/admin-${VITE_ADMIN_SECRET_KEY}`,
        element: <AdminPageLayout />,
        children: [{ path: 'manage/domain', element: <ManageDomainPage /> }],
    },
]);

export default router;

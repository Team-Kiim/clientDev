import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import AppLayout from '@/layout.tsx';
import MainPage from '@/Pages/page.tsx';
import SignInPage from '@/Pages/sign_in/page.tsx';
import SignUpPage from '@/Pages/sign_up/page.tsx';
import NaverRedirect from '@/Components/Auth/OAuthSection/NaverSection/NaverRedirect.tsx';
import KakaoRedirect from '@/Components/Auth/OAuthSection/KakaoSection/KakaoRedirect.tsx';
import PostPage from '@/Pages/qnas/[boardId]/page.tsx';
import QnAWritePage from '@/Pages/qnas/write/page.tsx';
import QnAEditPage from '@/Pages/qnas/edit/[postId]/page.tsx';

import CommunityPostWritePage from '@/Pages/community/write/page.tsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AppLayout />}>
            <Route>
                <Route element={<MainPage />} path={'/'} />
                <Route element={<SignInPage />} path={'/sign_in'} />
                <Route element={<SignUpPage />} path={'/sign_up'} />
                <Route element={<NaverRedirect />} path={'/oauth/naver'} />
                <Route element={<KakaoRedirect />} path={'/oauth/kakao'} />
            </Route>
            <Route>
                <Route element={<>Q&A</>} path={'/qnas'} />
                <Route element={<PostPage />} path={'/qnas/:postId'} />
                <Route element={<QnAWritePage />} path={'/qnas/write'} />
                <Route element={<QnAEditPage />} path={'/qnas/edit/:postId'} />
                <Route element={<CommunityPostWritePage />} path={'/community/write'} />
                <Route element={<>마이페이지</>} path={'/user/:userNickname'} />
            </Route>
        </Route>,
    ),
);

export default router;

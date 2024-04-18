import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import AppLayout from '@/layout.tsx';
import MainPage from '@/Pages/page.tsx';
import NaverRedirect from '@/Components/Auth/OAuthSection/NaverSection/NaverRedirect.tsx';
import QnAWritePage from '@/Pages/qnas/write/page.tsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AppLayout />}>
            <Route>
                <Route element={<MainPage />} path={'/'} />
                <Route element={<NaverRedirect />} path={'/oauth/naver'} />
            </Route>
            <Route>
                <Route element={<>Q&A</>} path={'/qnas'} />
                <Route element={<QnAWritePage />} path={'/qnas/write'} />
                <Route element={<>마이페이지</>} path={'/user/:userNickname'} />
            </Route>
        </Route>,
    ),
);

export default router;

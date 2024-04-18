import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import AppLayout from '@/layout.tsx';
import MainPage from '@/Pages/page.tsx';
import NaverRedirect from '@/Components/Auth/OAuthSection/NaverSection/NaverRedirect.tsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AppLayout />}>
            <Route>
                <Route element={<MainPage />} path={'/'} />
                <Route element={<NaverRedirect />} path={'/oauth/naver'} />
            </Route>
            <Route>
                <Route element={<>Q&A</>} path={'/qnas'} />
                <Route element={<>마이페이지</>} path={'/user/:userNickname'} />
            </Route>
        </Route>,
    ),
);

export default router;

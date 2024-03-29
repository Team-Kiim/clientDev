import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import AppLayout from '@/layout.tsx';
import MainPage from '@/Pages/page.tsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AppLayout />}>
            <Route>
                <Route element={<MainPage />} path={'/'} />
            </Route>
            <Route>
                <Route element={<>커뮤니티</>} path={'/community'} />
                <Route element={<>마이페이지</>} path={'/user/:userNickname'} />
            </Route>
        </Route>,
    ),
);

export default router;

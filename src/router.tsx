import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import AppLayout from '@/layout.tsx';
import MainPage from '@/Pages/page.tsx';
import DevQnAWritePage from '@/Pages/qnas/dev/write/page.tsx';
import NonDevQnAWritePage from '@/Pages/qnas/non_dev/write/page.tsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AppLayout />}>
            <Route>
                <Route element={<MainPage />} path={'/'} />
            </Route>
            <Route>
                <Route element={<>Q&A</>} path={'/qnas'} />
                <Route element={<DevQnAWritePage />} path={'/qnas/dev/write'} />
                <Route element={<NonDevQnAWritePage />} path={'/qnas/non_dev/write'} />
                <Route element={<>마이페이지</>} path={'/user/:userNickname'} />
            </Route>
        </Route>,
    ),
);

export default router;

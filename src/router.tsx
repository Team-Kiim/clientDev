import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route>
                <Route element={<>홈</>} path={'/'} />
            </Route>
            <Route>
                <Route element={<>커뮤니티</>} path={'/community'} />
                <Route element={<>마이페이지</>} path={'/user/:userNickname'} />
            </Route>
        </Route>,
    ),
);

export default router;

import { Suspense } from 'react';
import PostView from '@/Pages/qnas/[boardId]/Components/PostView.tsx';
import useScrollToTop from '@/Hooks/useScrollToTop.ts';

export default function Page() {
    useScrollToTop();

    return (
        <div className={'mt-8 flex w-full min-w-[1500px] justify-center'}>
            <div className={'w-[45rem]'}>
                <Suspense>
                    <PostView />
                </Suspense>
            </div>
        </div>
    );
}

import { Suspense } from 'react';
import PostView from '@/Pages/community/[boardId]/Components/PostView.tsx';
import useScrollToTop from '@/Hooks/useScrollToTop.ts';

export default function Page() {
    useScrollToTop();

    return (
        <div className={'mt-8 flex w-full min-w-[1500px] justify-center'}>
            <div className={'grid w-[64rem] grid-cols-10 gap-x-7'}>
                <Suspense>
                    <PostView />
                </Suspense>
            </div>
        </div>
    );
}

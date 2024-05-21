import { Suspense } from 'react';
import PostView from '@/Pages/qnas/[boardId]/Components/PostView.tsx';

export default function Page() {
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

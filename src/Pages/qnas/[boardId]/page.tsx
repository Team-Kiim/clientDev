import { Suspense } from 'react';
import PostDetails from '@/Pages/qnas/[boardId]/Components/PostDetails.tsx';

export default function Page() {
    return (
        <div className={'mt-8 flex w-full min-w-[1500px] justify-center'}>
            <div className={'grid w-[78rem] grid-cols-10 gap-x-7'}>
                <Suspense>
                    <PostDetails />
                </Suspense>
            </div>
        </div>
    );
}

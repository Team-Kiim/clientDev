import { Suspense } from 'react';
import PostSearchInput from '@/Pages/user/posts/Components/PostSearchInput.tsx';
import UserActivityFilter from '@/Pages/user/posts/Components/UserActivityFilter.tsx';
import PostSortFilter from '@/Pages/user/posts/Components/PostSortFilter.tsx';
import UserActivityPostList from '@/Pages/user/posts/Components/UserActivityPostList.tsx';

export default function Page() {
    return (
        <div className={'mb-6 flex flex-col gap-y-5'}>
            <h1 className={'flex text-xl font-extrabold'}>게시글 관리</h1>
            <div className={'flex flex-col gap-y-10'}>
                <div className={'flex flex-col gap-y-8'}>
                    <div className={'flex justify-end'}>
                        <PostSearchInput />
                    </div>
                    <div className={'flex items-center justify-between'}>
                        <UserActivityFilter />
                        <PostSortFilter />
                    </div>
                </div>
                <div>
                    <Suspense>
                        <UserActivityPostList />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

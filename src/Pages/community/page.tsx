import { Suspense } from 'react';
import PostSortFilters from '@/Components/PostSearchFilter/PostSortFilters.tsx';
import WritePostButton from '@/Components/Post/WritePostButton.tsx';
import PostListLoading from '@/Components/Post/PostListLoading.tsx';
import CommunityPostList from '@/Pages/community/Components/PostList/CommunityPostList.tsx';

export default function Page() {
    return (
        <div className={'mt-8 flex w-full min-w-[1500px] justify-center'}>
            <div className={'w-[73rem]'}>
                <div className={'flex items-center justify-between px-6'}>
                    <PostSortFilters />
                    <WritePostButton postType={'community'} />
                </div>
                <main className={'mb-12 mt-2'}>
                    <Suspense fallback={<PostListLoading />}>
                        <CommunityPostList />
                    </Suspense>
                </main>
            </div>
        </div>
    );
}

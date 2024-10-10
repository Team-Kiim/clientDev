import { Suspense } from 'react';
import PostSortFilters from '@/Components/PostSearchFilter/PostSortFilters.tsx';
import PostListLoading from '@/Components/Post/PostListLoading.tsx';
import CommunityPostList from '@/Pages/community/Components/PostList/CommunityPostList.tsx';
import SetPostHashtagSection from '@/Components/PostSearchFilter/PostHashtag/SetPostHashtagSection.tsx';

export default function Page() {
    return (
        <div className={'mt-8 flex w-full min-w-[1500px] justify-center'}>
            <div className={'w-[73rem]'}>
                <div className={'flex flex-col gap-y-5 px-6'}>
                    <div className={'w-fit'}>
                        <PostSortFilters />
                    </div>
                    <div>
                        <SetPostHashtagSection />
                    </div>
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

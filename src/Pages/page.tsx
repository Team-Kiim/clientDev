import { Suspense } from 'react';
import SetSkillCategorySection from '@/Components/PostSearchFilter/SkillCategory/SetSkillCategorySection.tsx';
import PostSortFilters from '@/Components/PostSearchFilter/PostSortFilters.tsx';
import PostListLoading from '@/Components/Post/PostListLoading.tsx';
import QnAPostList from '@/Pages/qnas/Components/PostList/QnAPostList.tsx';
import SetPostHashtagSection from '@/Components/PostSearchFilter/PostHashtag/SetPostHashtagSection.tsx';

export default function Page() {
    return (
        <div className={'mt-8 flex w-full min-w-[1500px] justify-center'}>
            <div className={'w-[73rem]'}>
                <div className={'flex flex-col gap-y-5 px-6'}>
                    <div className={'flex items-end justify-between gap-x-4'}>
                        <PostSortFilters />
                    </div>
                    <div className={'flex flex-col gap-y-2'}>
                        <SetSkillCategorySection />
                        <SetPostHashtagSection />
                    </div>
                </div>
                <main className={'mb-12 mt-2'}>
                    <Suspense fallback={<PostListLoading />}>
                        <QnAPostList />
                    </Suspense>
                </main>
            </div>
        </div>
    );
}

import { Suspense } from 'react';
import SetSkillCategorySection from '@/Components/PostSearchFilter/SkillCategory/SetSkillCategorySection.tsx';
import PostSortFilters from '@/Components/PostSearchFilter/PostSortFilters.tsx';
import WritePostButton from '@/Components/Post/WritePostButton.tsx';
import PostListLoading from '@/Components/Post/PostListLoading.tsx';
import QnAPostList from '@/Pages/qnas/Components/PostList/QnAPostList.tsx';

export default function Page() {
    return (
        <div className={'mt-8 flex w-full min-w-[1500px] justify-center'}>
            <div className={'w-[73rem]'}>
                <div className={'flex flex-col gap-y-5'}>
                    <div className={'px-6'}>
                        <SetSkillCategorySection />
                    </div>
                    <div className={'flex items-center justify-between px-6'}>
                        <PostSortFilters />
                        <WritePostButton postType={'qnas'} />
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

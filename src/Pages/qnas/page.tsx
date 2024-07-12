import CategorySetSection from '@/Components/PostSearchFilter/Category/CategorySetSection.tsx';
import SelectedCategoryList from '@/Components/SelectedCategoryList.tsx';
import PostList from '@/Components/Post/PostList.tsx';
import PostAddButton from '@/Components/Post/PostAddButton.tsx';
import PostSortOptions from '@/Components/PostSearchFilter/PostSortOptions.tsx';

export default function Page() {
    return (
        <div className={'mt-8 flex w-full min-w-[1500px] justify-center'}>
            <div className={'w-[80rem]'}>
                <div className={'flex items-center justify-between'}>
                    <CategorySetSection />
                    <SelectedCategoryList />
                    <PostAddButton />
                </div>
                <div className={'mx-2 mt-8'}>
                    <PostSortOptions />
                </div>
                <main className={'my-8'}>
                    <PostList />
                </main>
            </div>
        </div>
    );
}

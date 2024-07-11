import PostList from '@/Components/Post/PostList.tsx';
import PostAddButton from '@/Components/Post/PostAddButton.tsx';
import PostSortOptions from '@/Components/PostSearchFilter/PostSortOptions.tsx';

export default function Page() {
    return (
        <div className={'mt-8 flex w-full min-w-[1500px] justify-center'}>
            <div className={'w-[80rem]'}>
                <div className={'flex items-center justify-end'}>
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

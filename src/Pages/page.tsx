import SearchFilter from '@/Components/PostSearchFilter/SearchFilter.tsx';
import PostList from '@/Components/Post/PostList.tsx';
import PostAddButton from '@/Components/Post/PostAddButton.tsx';

export default function Page() {
    return (
        <div className={'mt-8 flex w-full min-w-[1500px] justify-center'}>
            <div className={'w-[87.5rem]'}>
                <SearchFilter />
                <main className={'my-8'}>
                    <PostList />
                </main>
                <PostAddButton />
            </div>
        </div>
    );
}

import SearchFilter from '@/Components/PostSearchFilter/SearchFilter.tsx';
import PostList from '@/Components/Post/PostList.tsx';
import PostAddButton from '@/Components/Post/PostAddButton.tsx';

export default function Page() {
    return (
        <div className={'mx-40 mt-28'}>
            <SearchFilter />
            <main className={'my-12'}>
                <PostList />
            </main>
            <PostAddButton />
        </div>
    );
}

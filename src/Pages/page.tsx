import { Suspense } from 'react';
import SearchFilter from '@/Components/PostSearchFilter/SearchFilter.tsx';
import PostAddButton from '@/Components/Post/PostAddButton.tsx';
import PostList from '@/Components/Post/PostList.tsx';

export default function Page() {
    return (
        <div>
            <SearchFilter />
            <PostAddButton />
            <div className={'my-12'}>
                <Suspense fallback={<>Loading...</>}>
                    <PostList />
                </Suspense>
            </div>
        </div>
    );
}

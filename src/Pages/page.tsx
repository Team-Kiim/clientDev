import { Suspense } from 'react';
import SearchFilter from '@/Components/PostSearchFilter/SearchFilter.tsx';
import QnAWriteLinksControl from '@/Components/QnAWrite/QnAWriteLinksControl.tsx';
// import PostAddButton from '@/Components/Post/PostAddButton.tsx';
import PostList from '@/Components/Post/PostList.tsx';

export default function Page() {
    return (
        <div className={'mx-40'}>
            <SearchFilter />
            <QnAWriteLinksControl />
            <main className={'my-12'}>
                <Suspense fallback={<>Loading...</>}>
                    <PostList />
                </Suspense>
            </main>
        </div>
    );
}

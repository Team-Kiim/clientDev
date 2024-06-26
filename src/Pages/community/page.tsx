import PostList from '@/Components/Post/PostList.tsx';
import PostAddButton from '@/Components/Post/PostAddButton.tsx';

export default function Page() {
    return (
        <div className={'mt-8 flex w-full min-w-[1500px] justify-center'}>
            <div className={'w-[87.5rem]'}>
                <div className={'flex items-center justify-between'}>
                    <PostAddButton />
                </div>
                <main className={'my-8'}>
                    <PostList />
                </main>
            </div>
        </div>
    );
}

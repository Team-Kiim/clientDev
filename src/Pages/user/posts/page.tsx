import PostListWithFilters from '@/Pages/user/posts/Components/PostListWithFilters.tsx';

export default function Page() {
    return (
        <>
            <div className={'mb-6 flex flex-col gap-y-7'}>
                <h1 className={'flex text-xl font-extrabold'}>게시글 관리</h1>
                <div>
                    <PostListWithFilters />
                </div>
            </div>
        </>
    );
}

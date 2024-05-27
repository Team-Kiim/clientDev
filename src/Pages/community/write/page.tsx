import CommunityPostWriteForm from '@/Pages/community/write/Components/CommunityPostWriteForm.tsx';

export default function Page() {
    return (
        <div className={'flex w-full min-w-[1500px] justify-center'}>
            <div className={'my-5 flex w-[45rem] flex-col gap-y-3'}>
                <h1 className={'text-2xl font-extrabold'}>커뮤니티 게시글 작성</h1>
                <CommunityPostWriteForm />
            </div>
        </div>
    );
}

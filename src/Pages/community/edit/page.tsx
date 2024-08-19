import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import CommunityPostEditForm from '@/Pages/community/edit/Components/CommunityPostEditForm.tsx';

export default function Page() {
    const { postId } = useParams();

    return (
        <div className={'relative flex w-full min-w-[1500px] justify-center'}>
            <div className={'my-5 flex flex-col gap-y-5'}>
                <Suspense>
                    <h1 className={'mx-0.5 text-lg font-extrabold'}>커뮤니티 게시글 수정</h1>
                    <CommunityPostEditForm postId={postId} />
                </Suspense>
            </div>
        </div>
    );
}

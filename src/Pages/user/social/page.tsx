import { Suspense } from 'react';
import SocialApiErrorBoundary from '@/Pages/user/social/Components/SocialApiErrorBoundary.tsx';
import FollowingList from '@/Pages/user/social/Components/Following/FollowingList.tsx';
import FollowerList from '@/Pages/user/social/Components/Follower/FollowerList.tsx';

export default function Page() {
    return (
        <>
            <div className={'mb-6 flex flex-col gap-y-7'}>
                <h1 className={'flex text-xl font-extrabold'}>소셜 관리</h1>
                <div className={'flex flex-col gap-y-1'}>
                    <h3 className={'text-[0.95rem] font-bold'}>팔로잉 목록</h3>
                    <div className={'relative h-96 rounded-lg border border-slate-200'}>
                        <SocialApiErrorBoundary relationshipType={'following'}>
                            <Suspense fallback={<>로딩</>}>
                                <FollowingList />
                            </Suspense>
                        </SocialApiErrorBoundary>
                    </div>
                </div>
                <hr />
                <div className={'flex flex-col gap-y-1'}>
                    <h3 className={'text-[0.95rem] font-bold'}>팔로워 목록</h3>
                    <div className={'relative h-96 rounded-lg border border-slate-200'}>
                        <SocialApiErrorBoundary relationshipType={'follower'}>
                            <Suspense fallback={<>로딩</>}>
                                <FollowerList />
                            </Suspense>
                        </SocialApiErrorBoundary>
                    </div>
                </div>
            </div>
        </>
    );
}

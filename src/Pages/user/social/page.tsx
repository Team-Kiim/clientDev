import { useOutletContext } from 'react-router-dom';
import FollowingList from '@/Pages/user/social/Components/Following/FollowingList.tsx';
import FollowerList from '@/Pages/user/social/Components/Follower/FollowerList.tsx';
import { User } from '@/Types/User.ts';

interface UserDataContext {
    userData: User;
}

export default function Page() {
    const { userData } = useOutletContext<UserDataContext>();

    return (
        <>
            <div className={'mb-6 flex flex-col gap-y-7'}>
                <h1 className={'flex text-xl font-extrabold'}>소셜 관리</h1>
                <div className={'flex flex-col gap-y-1'}>
                    <div className={'flex items-center gap-x-2'}>
                        <h3 className={'text-[0.95rem] font-bold'}>팔로잉 목록</h3>
                        <span className={'text-[0.8rem] font-extrabold text-slate-500'}>(팔로잉 수 : {10})</span>
                    </div>
                    <div className={'rounded-lg border border-slate-200'}>
                        <FollowingList />
                    </div>
                </div>
                <hr />
                <div className={'flex flex-col gap-y-1'}>
                    <div className={'flex items-center gap-x-2'}>
                        <h3 className={'text-[0.95rem] font-bold'}>팔로워 목록</h3>
                        <span className={'text-[0.8rem] font-extrabold text-slate-500'}>(팔로우 수 : {10})</span>
                    </div>
                    <div className={'rounded-lg border border-slate-200'}>
                        <FollowerList />
                    </div>
                </div>
            </div>
        </>
    );
}

import { Suspense } from 'react';
import UserSearchInput from '@/Pages/user/social/Components/UserSearchInput.tsx';
import SocialFilters from '@/Pages/user/social/Components/SocialFilters.tsx';
import SocialMediaUserList from '@/Pages/user/social/Components/SocialMediaUserList.tsx';
import SocialMediaUserListLoading from '@/Pages/user/social/Components/SocialMediaUserListLoading.tsx';
import SocialApiErrorBoundary from '@/Pages/user/social/Components/SocialApiErrorBoundary.tsx';
import type { User } from '@/Types/User.ts';
import { useOutletContext } from 'react-router-dom';

interface UserDataContext {
    userData: User;
}

export default function Page() {
    const { userData } = useOutletContext<UserDataContext>();

    return (
        <div className={'mb-6 flex flex-col gap-y-5'}>
            <h1 className={'flex text-xl font-extrabold'}>{userData.isLoginMember ? '소셜 관리' : '소셜 정보'}</h1>
            <div className={'flex flex-col gap-y-10'}>
                <div className={'flex items-center justify-between'}>
                    <SocialFilters />
                    <UserSearchInput />
                </div>
                <div>
                    <SocialApiErrorBoundary>
                        <Suspense fallback={<SocialMediaUserListLoading />}>
                            <SocialMediaUserList />
                        </Suspense>
                    </SocialApiErrorBoundary>
                </div>
            </div>
        </div>
    );
}

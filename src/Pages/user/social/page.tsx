import { Suspense } from 'react';
import UserSearchInput from '@/Pages/user/social/Components/UserSearchInput.tsx';
import SocialFilters from '@/Pages/user/social/Components/SocialFilters.tsx';
import SocialMediaUserList from '@/Pages/user/social/Components/SocialMediaUserList.tsx';
import SocialMediaUserListLoading from '@/Pages/user/social/Components/SocialMediaUserListLoading.tsx';

export default function Page() {
    return (
        <div className={'mb-6 flex flex-col gap-y-5'}>
            <h1 className={'flex text-xl font-extrabold'}>소셜 관리</h1>
            <div className={'flex flex-col gap-y-10'}>
                <div className={'flex items-center justify-between'}>
                    <SocialFilters />
                    <UserSearchInput />
                </div>
                <div>
                    <Suspense fallback={<SocialMediaUserListLoading />}>
                        <SocialMediaUserList />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

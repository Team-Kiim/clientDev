import { Outlet, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MdOutlineEmail } from 'react-icons/md';
import EditableProfileImage from '@/Pages/user/Components/EditableProfileImage.tsx';
import SubscriptionSection from '@/Pages/user/Components/Subscription/SubscriptionSection.tsx';
import SideNavbar from '@/Pages/user/Components/SideNavbar.tsx';
import getUserData from '@/Pages/user/Utils/getUserData.ts';

export default function UserPageLayout() {
    const { VITE_SERVER_URL } = import.meta.env;

    const nickname = useParams().nickname ?? '';

    const { data, isLoading, isPending } = useQuery({
        queryKey: ['user'],
        queryFn: getUserData,
        throwOnError: true,
        gcTime: 0,
    });

    if (isLoading || isPending) {
        return null;
    }

    console.log(data);

    return (
        <div className={'mt-7 flex w-full min-w-[1500px] justify-center'}>
            <div className={'w-[60rem]'}>
                <div className={'flex gap-x-10 border-b border-gray-200 p-2 pb-6'}>
                    <EditableProfileImage
                        profileImageName={data.profileImageName}
                        profileImagePath={`${VITE_SERVER_URL}/image/${data.profileImagePath}/${data.profileImageName}`}
                    />
                    <div className={'flex h-[144px] flex-1 flex-col justify-center gap-y-3'}>
                        <span className={'text-3xl font-extrabold'}>{data.nickname}</span>
                        <div className={'flex items-center gap-x-2'}>
                            <MdOutlineEmail className={'size-6 text-slate-500'} />
                            <span className={'text-md font-bold text-slate-500'}>{data.email}</span>
                        </div>
                        <SubscriptionSection isMemberSubscribed={true} />
                    </div>
                </div>
                <div className={'flex gap-x-10 p-2'}>
                    <SideNavbar />
                    <div className={'flex-1 py-4'}>
                        <Outlet context={{ userData: data }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

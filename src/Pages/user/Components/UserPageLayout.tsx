import { Outlet, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MdOutlineEmail } from 'react-icons/md';
import EditableProfileImage from '@/Pages/user/Components/EditableProfileImage.tsx';
import FollowToggleButton from '@/Pages/user/Components/FollowToggleButton.tsx';
import SideNavbar from '@/Pages/user/Components/SideNavbar.tsx';
import getUserData from '@/Pages/user/Utils/getUserData.ts';
import { LiaUser } from 'react-icons/lia';

export default function UserPageLayout() {
    const { VITE_SERVER_URL } = import.meta.env;

    const profileMemberId = useParams().profileMemberId ?? null;

    const { data, isLoading, isPending } = useQuery({
        queryKey: ['user', profileMemberId],
        queryFn: getUserData,
        throwOnError: true,
        gcTime: 0,
    });

    if (isLoading || isPending) {
        return null;
    }

    return (
        <div className={'mt-7 flex w-full min-w-[1500px] justify-center'}>
            <div className={'w-[60rem]'}>
                <div className={'flex gap-x-10 border-b border-gray-200 p-2 pb-6'}>
                    {data.isLoginMember ? (
                        <EditableProfileImage
                            profileImageName={data.profileImageName}
                            profileImagePath={`${VITE_SERVER_URL}/image/${data.profileImagePath}/${data.profileImageName}`}
                        />
                    ) : (
                        <div className={'w-[10rem]'}>
                            <img
                                className={'size-36 rounded-full object-cover'}
                                src={`${VITE_SERVER_URL}/image/${data.profileImagePath}/${data.profileImageName}`}
                                alt={data.profileImageName}
                            />
                        </div>
                    )}
                    <div className={'flex h-[144px] flex-1 flex-col justify-center gap-y-2'}>
                        <span className={'text-3xl font-extrabold'}>{data.nickname}</span>
                        <div className={'flex items-center justify-between'}>
                            <div className={'flex items-center gap-x-1'}>
                                <MdOutlineEmail className={'size-6 text-neutral-800'} />
                                <span
                                    className={
                                        'text-md font-bold text-neutral-800 underline decoration-neutral-800 decoration-2 underline-offset-4'
                                    }
                                >
                                    {data.email}
                                </span>
                            </div>
                            {!data.isLoginMember && (
                                <FollowToggleButton
                                    profileMemberId={profileMemberId}
                                    isFollowingMember={data.isFollowingMember}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className={'flex gap-x-10 p-2'}>
                    {data.isLoginMember ? (
                        <SideNavbar />
                    ) : (
                        <div className={'w-[10rem] py-4'}>
                            <div className={'rounded-md bg-slate-100 px-3 py-1.5 text-[0.95rem] font-bold'}>
                                <div className={'flex items-center gap-x-4'}>
                                    <LiaUser className={'size-7'} />
                                    <span>프로필 정보</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className={'flex-1 py-4'}>
                        <Outlet context={{ userData: data }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

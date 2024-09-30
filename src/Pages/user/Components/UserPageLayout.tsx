import { Outlet, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { HiCheck } from 'react-icons/hi';
import { MdCorporateFare, MdOutlineEmail } from 'react-icons/md';
import EditableProfileImage from '@/Pages/user/Components/EditableProfileImage.tsx';
import FollowToggleButton from '@/Pages/user/Components/FollowToggleButton.tsx';
import EmployeeVerificationSection from '@/Pages/user/Components/EmployeeVerification/EmployeeVerificationSection.tsx';
import SideNavbar from '@/Pages/user/Components/SideNavbar.tsx';
import VisitorSideNavbar from '@/Pages/user/Components/VisitorSideNavbar.tsx';
import getUserData from '@/Pages/user/Utils/getUserData.ts';

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
                    <div className={'flex h-[144px] flex-1 flex-col justify-center gap-y-1'}>
                        <div className={'flex items-center gap-x-2'}>
                            <span className={'text-3xl font-extrabold'}>{data.nickname}</span>
                            {data.corpVerified && (
                                <div
                                    className={
                                        'flex size-6 items-center justify-center rounded-full bg-gradient-to-r from-plump-purple-600 to-rose-500'
                                    }
                                >
                                    <HiCheck className={'size-5 text-white'} />
                                </div>
                            )}
                        </div>
                        <div className={'flex items-center justify-between'}>
                            <div className={'flex flex-col gap-y-1'}>
                                <div className={'flex items-center gap-x-1'}>
                                    <MdOutlineEmail className={'size-6 text-slate-600'} />
                                    <span
                                        className={
                                            'text-base font-bold text-slate-600 underline decoration-slate-600 decoration-2 underline-offset-4'
                                        }
                                    >
                                        {data.email}
                                    </span>
                                </div>
                                {data.corpName && (
                                    <div className={'flex items-center gap-x-1'}>
                                        <MdCorporateFare className={'size-6 text-slate-600'} />
                                        <span className={'text-md font-bold text-slate-600'}>{data.corpName}</span>
                                    </div>
                                )}
                            </div>
                            {!data.isLoginMember ? (
                                <FollowToggleButton
                                    profileMemberId={profileMemberId}
                                    isFollowingMember={data.isFollowingMember}
                                />
                            ) : (
                                <EmployeeVerificationSection />
                            )}
                        </div>
                    </div>
                </div>
                <div className={'flex gap-x-10 p-2'}>
                    {data.isLoginMember ? <SideNavbar /> : <VisitorSideNavbar />}
                    <div className={'flex-1 py-4'}>
                        <Outlet context={{ userData: data }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

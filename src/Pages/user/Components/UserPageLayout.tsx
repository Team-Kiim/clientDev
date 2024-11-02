import { Link, Outlet, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { HiCheck } from 'react-icons/hi';
import { MdCorporateFare, MdOutlineEmail } from 'react-icons/md';
import EditableProfileImage from '@/Pages/user/Components/EditableProfileImage.tsx';
import FollowStateToggleButton from '@/Pages/user/Components/FollowStateToggleButton.tsx';
import EmployeeVerificationSection from '@/Pages/user/Components/EmployeeVerification/EmployeeVerificationSection.tsx';
import SideNavbar from '@/Pages/user/Components/SideNavbar.tsx';
import VisitorSideNavbar from '@/Pages/user/Components/VisitorSideNavbar.tsx';
import fetchUserData from '@/Pages/user/Utils/fetchUserData.ts';

export default function UserPageLayout() {
    const { VITE_ADMIN_SECRET_KEY } = import.meta.env;

    const profileMemberId = useParams().profileMemberId;

    const { data, isLoading, isPending } = useQuery({
        queryKey: profileMemberId ? ['user', profileMemberId] : ['user'],
        queryFn: fetchUserData,
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
                        <EditableProfileImage profileImageUrl={data.profileImageUrl} />
                    ) : (
                        <div className={'w-[10rem]'}>
                            <img
                                className={'size-36 rounded-full object-cover'}
                                src={`https://${data.profileImageUrl}`}
                                alt={'user profile image'}
                            />
                        </div>
                    )}
                    <div className={'flex h-[144px] flex-1 flex-col justify-center gap-y-1'}>
                        <div className={'flex items-center justify-between'}>
                            <div className={'flex items-center gap-x-2'}>
                                <span className={'text-3xl font-extrabold'}>{data.nickname}</span>
                                {data.corpVerified && (
                                    <div
                                        className={'tooltip tooltip-right flex items-center before:text-[0.85rem]'}
                                        data-tip={'현직자 인증 완료'}
                                    >
                                        <div
                                            className={
                                                'flex size-6 items-center justify-center rounded-full bg-gradient-to-r from-plump-purple-600 to-plump-purple-400'
                                            }
                                        >
                                            <HiCheck className={'size-5 text-white'} />
                                        </div>
                                    </div>
                                )}
                            </div>
                            {data.memberRole === 'ADMIN' && (
                                <div className={'px-1'}>
                                    <Link
                                        className={'text-[0.85rem] text-slate-600 underline underline-offset-4'}
                                        to={`/admin-${VITE_ADMIN_SECRET_KEY}`}
                                        target={'_blank'}
                                    >
                                        관리자 페이지
                                    </Link>
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
                                <FollowStateToggleButton
                                    profileMemberId={profileMemberId}
                                    isFollowingMember={data.isFollowingMember}
                                    userNickname={data.nickname}
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

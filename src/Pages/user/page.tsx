import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ProfileUpdateModal from '@/Pages/user/Components/ProfileUpdate/ProfileUpdateModal.tsx';
import CategoryUpdateModal from '@/Pages/user/Components/CategoryUpdate/CategoryUpdateModal.tsx';
import InterestCategoryList from '@/Pages/user/Components/InterestCategoryList.tsx';
import type { User } from '@/Types/User.ts';

interface UserDataContext {
    userData: User;
}

const jobs = [
    { value: 'COMPANY_EMPLOYEE', label: '현직자' },
    { value: 'FREELANCER', label: '프리랜서' },
    { value: 'STUDENT', label: '학생' },
    { value: 'GENERAL', label: '일반' },
];

export default function Page() {
    const [isProfileUpdateModalOpen, setIsProfileUpdateModalOpen] = useState(false);
    const [isCategoryUpdateModalOpen, setIsCategoryUpdateModalOpen] = useState(false);

    const { userData } = useOutletContext<UserDataContext>();

    const { email, nickname, memberRole, interestSkillCategoryList, isLoginMember } = userData;

    return (
        <>
            <div className={'flex flex-col gap-y-6'}>
                <h1 className={'flex text-xl font-extrabold'}>프로필 정보</h1>
                <div className={'flex flex-col gap-y-4'}>
                    <div className={'flex flex-col'}>
                        <div className={'flex flex-col gap-y-6'}>
                            <div className={'flex flex-col gap-y-1'}>
                                <h3 className={'text-[0.95rem] font-bold'}>이메일</h3>
                                <span className={'text-[0.9rem] text-slate-600'}>{email}</span>
                            </div>
                            <div className={'flex flex-col gap-y-1'}>
                                <h3 className={'text-[0.95rem] font-bold'}>닉네임</h3>
                                <span className={'text-[0.9rem] text-slate-600'}>{nickname}</span>
                            </div>
                            <div className={'flex flex-col gap-y-1'}>
                                <h3 className={'text-[0.95rem] font-bold'}>직업</h3>
                                {memberRole === 'TEMP' ? (
                                    <p className={'text-[0.9rem] text-rose-500'}>설정된 직업이 없습니다.</p>
                                ) : (
                                    <span className={'text-[0.9rem] font-bold text-slate-500'}>
                                        {jobs.find(job => job.value === memberRole).label}
                                    </span>
                                )}
                            </div>
                        </div>
                        {isLoginMember && (
                            <div className={'flex items-center justify-end'}>
                                <button
                                    className={
                                        'rounded-3xl border border-slate-300 bg-white px-3 py-1.5 text-[0.85rem] font-bold text-neutral-800 transition-all hover:bg-slate-100'
                                    }
                                    type={'button'}
                                    onClick={() => {
                                        setIsProfileUpdateModalOpen(true);
                                    }}
                                >
                                    정보 수정
                                </button>
                            </div>
                        )}
                    </div>
                    <hr />
                    <div className={'flex flex-col gap-y-3'}>
                        <div className={'flex flex-col gap-y-4'}>
                            <h3 className={'text-[0.95rem] font-bold'}>관심 카테고리</h3>
                            {!isLoginMember && interestSkillCategoryList.length === 0 ? (
                                <p className={'text-[0.9rem] text-rose-500'}>설정된 관심 카테고리가 없어요.</p>
                            ) : (
                                <InterestCategoryList interestSkillCategories={interestSkillCategoryList} />
                            )}
                        </div>
                        {isLoginMember && (
                            <div className={'flex items-center justify-end'}>
                                <button
                                    className={
                                        'rounded-3xl border border-slate-300 bg-white px-3 py-1.5 text-[0.85rem] font-bold text-neutral-800 transition-all hover:bg-slate-100'
                                    }
                                    type={'button'}
                                    onClick={() => {
                                        setIsCategoryUpdateModalOpen(true);
                                    }}
                                >
                                    카테고리 설정
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ProfileUpdateModal
                isModalOpen={isProfileUpdateModalOpen}
                closeModal={() => {
                    setIsProfileUpdateModalOpen(false);
                }}
                profileData={{ nickname, job: memberRole }}
            />
            <CategoryUpdateModal
                isModalOpen={isCategoryUpdateModalOpen}
                closeModal={() => {
                    setIsCategoryUpdateModalOpen(false);
                }}
                interestSkillCategoryList={interestSkillCategoryList}
            />
        </>
    );
}

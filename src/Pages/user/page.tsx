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

    const { email, nickname, memberRole, interestSkillCategoryList, loginMember } = userData;

    return (
        <>
            <div className={'flex flex-col gap-y-6'}>
                <h1 className={'flex text-xl font-extrabold'}>프로필 정보</h1>
                <div className={'flex flex-col gap-y-4'}>
                    <div className={'flex flex-col'}>
                        <div className={'flex flex-col gap-y-6'}>
                            <div className={'flex flex-col gap-y-1'}>
                                <h3 className={'text-[0.95rem] font-bold'}>이메일</h3>
                                <span className={'text-[0.9rem] font-bold text-slate-500'}>{email}</span>
                            </div>
                            <div className={'flex flex-col gap-y-1'}>
                                <h3 className={'text-[0.95rem] font-bold'}>닉네임</h3>
                                <span className={'text-[0.9rem] font-bold text-slate-500'}>{nickname}</span>
                            </div>
                            <div className={'flex flex-col gap-y-1'}>
                                <h3 className={'text-[0.95rem] font-bold'}>직업</h3>
                                {memberRole === 'TEMP' ? (
                                    <p className={'text-[0.9rem] font-bold text-rose-600'}>
                                        선택된 직업이 없습니다. 직업을 설정해주세요.
                                    </p>
                                ) : (
                                    <span className={'text-[0.9rem] font-bold text-slate-500'}>
                                        {jobs.find(job => job.value === memberRole).label}
                                    </span>
                                )}
                            </div>
                        </div>
                        {loginMember && (
                            <div className={'flex items-center justify-end'}>
                                <button
                                    className={
                                        'rounded-3xl border border-slate-300 bg-white px-3.5 py-2 text-[0.9rem] font-bold text-black transition-all hover:bg-slate-50'
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
                            <InterestCategoryList interestSkillCategories={interestSkillCategoryList} />
                        </div>
                        {loginMember && (
                            <div className={'flex items-center justify-end'}>
                                <button
                                    className={
                                        'rounded-3xl border border-slate-300 px-3.5 py-2 text-[0.9rem] font-bold text-black transition-all hover:bg-slate-50'
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

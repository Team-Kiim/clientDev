import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MdOutlineTag } from 'react-icons/md';
import { VscSettings } from 'react-icons/vsc';
import SetSkillCategoryModal from '@/Components/PostSearchFilter/SkillCategory/SetSkillCategoryModal.tsx';
import SelectedCategoryList from '@/Components/PostSearchFilter/SkillCategory/SelectedCategoryList.tsx';

export default function SetSkillCategorySection() {
    const [isSetSkillCategoryModalOpen, setIsSetSkillCategoryModalOpen] = useState(false);

    const [searchParams] = useSearchParams();

    return (
        <>
            <div className={'flex w-[30rem] items-center gap-x-2 rounded-3xl border border-slate-200 px-3'}>
                <MdOutlineTag className={'size-7'} style={{ fill: 'url(#icon-gradient)' }} />
                {searchParams.getAll('category').length !== 0 ? (
                    <SelectedCategoryList />
                ) : (
                    <div className={'flex h-11 flex-1 items-center'}>
                        <p className={'text-[0.8rem] text-slate-400'}>카테고리를 설정해보세요.</p>
                    </div>
                )}
                <div className={'tooltip tooltip-bottom flex items-center'} data-tip={'카테고리 설정'}>
                    <button
                        className={'transition-all hover:scale-105'}
                        type={'button'}
                        onClick={() => {
                            setIsSetSkillCategoryModalOpen(!isSetSkillCategoryModalOpen);
                        }}
                    >
                        <VscSettings className={'size-7'} style={{ fill: 'url(#icon-gradient)' }} />
                    </button>
                </div>
            </div>
            <SetSkillCategoryModal
                isModalOpen={isSetSkillCategoryModalOpen}
                closeModal={() => {
                    setIsSetSkillCategoryModalOpen(false);
                }}
            />
        </>
    );
}

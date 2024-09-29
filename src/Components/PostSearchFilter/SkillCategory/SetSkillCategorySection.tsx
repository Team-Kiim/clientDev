import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { VscSettings } from 'react-icons/vsc';
import SetSkillCategoryModal from '@/Components/PostSearchFilter/SkillCategory/SetSkillCategoryModal.tsx';
import SelectedCategoryList from '@/Components/PostSearchFilter/SkillCategory/SelectedCategoryList.tsx';

export default function SetSkillCategorySection() {
    const [isSetSkillCategoryModalOpen, setIsSetSkillCategoryModalOpen] = useState(false);

    const [searchParams] = useSearchParams();

    const skillCategoryList = searchParams.getAll('category');

    return (
        <>
            <div
                className={`flex w-3/5 flex-shrink-0 ${skillCategoryList.length === 0 ? 'cursor-pointer' : 'cursor-auto'} items-center gap-x-2 rounded-lg border border-slate-200 px-3`}
                onClick={() => {
                    if (skillCategoryList.length === 0) {
                        setIsSetSkillCategoryModalOpen(!isSetSkillCategoryModalOpen);
                    }
                }}
            >
                <div className={'tooltip tooltip-bottom flex items-center'} data-tip={'카테고리 설정'}>
                    <button
                        type={'button'}
                        onClick={event => {
                            event.preventDefault();
                            setIsSetSkillCategoryModalOpen(!isSetSkillCategoryModalOpen);
                        }}
                    >
                        <VscSettings className={'size-7 text-plump-purple-600'} />
                    </button>
                </div>
                {skillCategoryList.length !== 0 ? (
                    <SelectedCategoryList />
                ) : (
                    <div className={'flex h-11 flex-1 items-center'}>
                        <p className={'text-[0.8rem] text-slate-400'}>카테고리를 설정해보세요.</p>
                    </div>
                )}
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

import { isEqual } from 'lodash';
import { useState } from 'react';
import ParentSkillCategoryList from '@/Pages/qnas/Components/SkillCategory/ParentSkillCategoryList.tsx';
import ChildSkillCategoryList from '@/Pages/qnas/Components/SkillCategory/ChildSkillCategoryList.tsx';
import { CATEGORIES } from '@/Constants/categories.ts';
import { HiOutlineArrowPath } from 'react-icons/hi2';

interface SkillCategory {
    parentSkillCategory: string;
    childSkillCategory: string;
}

interface Props {
    closeModal(): void;
    selectedSkillCategoryList: SkillCategory[];
    updateSelectedSkillCategoryList(newSkillCategoryList: SkillCategory[]): void;
}

export default function SelectSkillCategoryModal({
    closeModal,
    selectedSkillCategoryList,
    updateSelectedSkillCategoryList,
}: Props) {
    const [selectedParentSkillCategory, setSelectedParentSkillCategory] = useState(CATEGORIES[0].value);

    const [newSelectedSkillCategoryList, setNewSelectedSkillCategoryList] = useState(selectedSkillCategoryList);

    const handleParentCategoryListItemClick = (parentSkillCategory: string) => {
        setSelectedParentSkillCategory(parentSkillCategory);
    };

    const handleChildCategoryListItemClick = (skillCategory: SkillCategory) => {
        for (const newSelectedSkillCategory of newSelectedSkillCategoryList) {
            if (isEqual(newSelectedSkillCategory, skillCategory)) {
                setNewSelectedSkillCategoryList(
                    newSelectedSkillCategoryList.filter(newSelectedSkillCategory => {
                        return !isEqual(newSelectedSkillCategory, skillCategory);
                    }),
                );
                return;
            }
        }
        setNewSelectedSkillCategoryList([...newSelectedSkillCategoryList, skillCategory]);
    };

    const handleResetSelectedSkillCategoryListButtonClick = () => {
        updateSelectedSkillCategoryList([]);
        closeModal();
    };

    const handleUpdateSelectedSkillCategoryListButtonClick = () => {
        updateSelectedSkillCategoryList(newSelectedSkillCategoryList);
        closeModal();
    };

    return (
        <div className={'absolute right-0 top-2 z-10 flex w-full flex-col gap-y-4 rounded-lg bg-white shadow-xl'}>
            <div>
                <div className={'w-full border-b border-slate-200 p-2'}>
                    <ParentSkillCategoryList
                        selectedParentSkillCategory={selectedParentSkillCategory}
                        onParentSkillCategoryListItemClick={handleParentCategoryListItemClick}
                    />
                </div>
                <ChildSkillCategoryList
                    selectedParentSkillCategory={selectedParentSkillCategory}
                    selectedSkillCategoryList={newSelectedSkillCategoryList}
                    onChildSkillCategoryListItemClick={handleChildCategoryListItemClick}
                />
            </div>
            <div className={'mb-2 flex w-full justify-between p-3'}>
                <div className={'tooltip tooltip-bottom flex items-center justify-center'} data-tip={'초기화'}>
                    <button
                        className={'rounded-full p-1 transition-all hover:bg-slate-100'}
                        type={'button'}
                        onClick={handleResetSelectedSkillCategoryListButtonClick}
                    >
                        <HiOutlineArrowPath className={'size-6 text-slate-800'} />
                    </button>
                </div>
                <button
                    className={
                        'rounded-lg bg-plump-purple-600 px-4 py-2 text-[0.9rem] font-bold text-white transition-all hover:bg-plump-purple-700'
                    }
                    onClick={handleUpdateSelectedSkillCategoryListButtonClick}
                >
                    적용
                </button>
            </div>
        </div>
    );
}

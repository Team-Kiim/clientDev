import { CATEGORIES } from '@/Constants/categories.ts';

interface SkillCategory {
    parentSkillCategory: string;
    childSkillCategory: string;
}

interface Props {
    selectedParentSkillCategory: string;
    selectedSkillCategoryList: SkillCategory[];
    onChildSkillCategoryListItemClick(newSkillCategory: SkillCategory): void;
}

export default function ChildSkillCategoryList({
    selectedParentSkillCategory,
    selectedSkillCategoryList,
    onChildSkillCategoryListItemClick,
}: Props) {
    return (
        <ul
            className={
                'flex h-48 w-full flex-wrap content-start justify-center gap-x-2 overflow-y-auto px-2 scrollbar-hide'
            }
        >
            {CATEGORIES.find(
                parentSkillCategory => parentSkillCategory.value === selectedParentSkillCategory,
            ).childCategories.map(childSkillCategory => {
                return (
                    <li
                        key={childSkillCategory.value}
                        className={`my-1.5 cursor-pointer rounded-2xl bg-slate-100 px-2.5 py-1.5 text-[0.8rem] font-bold ${selectedSkillCategoryList.find(selectedSkillCategory => selectedSkillCategory.parentSkillCategory === selectedParentSkillCategory && selectedSkillCategory.childSkillCategory === childSkillCategory.value) ? 'bg-violet-600 text-white' : 'text-black'} transition-all`}
                        onClick={() => {
                            onChildSkillCategoryListItemClick({
                                parentSkillCategory: selectedParentSkillCategory,
                                childSkillCategory: childSkillCategory.value,
                            });
                        }}
                    >
                        {childSkillCategory.label}
                    </li>
                );
            })}
        </ul>
    );
}

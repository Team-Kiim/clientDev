import { CATEGORIES } from '@/Constants/categories.ts';
import type { SkillCategory } from '@/Types/skillCategory.ts';

interface Props {
    selectedParentSkillCategory: string;
    selectedSkillCategories: SkillCategory[];
    onChildSkillCategoryButtonClick(skillCategory: SkillCategory): void;
}

export default function ChildSkillCategoryList({
    selectedParentSkillCategory,
    selectedSkillCategories,
    onChildSkillCategoryButtonClick,
}: Props) {
    console.log(selectedSkillCategories);
    return (
        <ul className={'flex h-48 w-full flex-wrap  content-start gap-x-1 gap-y-2 px-3'}>
            {CATEGORIES.find(category => category.value === selectedParentSkillCategory).childCategories.map(
                childCategory => (
                    <li key={childCategory.value}>
                        <button
                            className={`rounded-2xl border px-4 py-1.5 text-[0.8rem] font-bold ${selectedSkillCategories.find(category => category.parentSkillCategory === selectedParentSkillCategory && category.childSkillCategory === childCategory.value) ? 'border-plump-purple-600 bg-plump-purple-50 text-plump-purple-600' : 'border-slate-200 text-neutral-800'} transition-all`}
                            type={'button'}
                            onClick={() => {
                                onChildSkillCategoryButtonClick({
                                    parentSkillCategory: selectedParentSkillCategory,
                                    childSkillCategory: childCategory.value,
                                });
                            }}
                        >
                            {childCategory.label}
                        </button>
                    </li>
                ),
            )}
        </ul>
    );
}

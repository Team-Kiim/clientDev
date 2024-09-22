import { CATEGORIES } from '@/Constants/categories.ts';

interface Category {
    parentSkillCategory: string;
    childSkillCategory: string;
}

interface Props {
    selectedParentCategory: string;
    selectedCategories: Category[];
    onChildCategoryListItemClick(category: Category): void;
}

export default function ChildCategoryList({
    selectedParentCategory,
    selectedCategories,
    onChildCategoryListItemClick,
}: Props) {
    return (
        <ul
            className={
                'flex h-40 w-full flex-wrap content-start justify-center gap-x-2 overflow-y-auto px-2 scrollbar-hide'
            }
        >
            {CATEGORIES.find(parentCategory => parentCategory.value === selectedParentCategory).childCategories.map(
                childCategory => {
                    return (
                        <li
                            key={childCategory.value}
                            className={`my-1.5 cursor-pointer rounded-2xl border px-4 py-1.5 text-[0.8rem] font-bold ${selectedCategories.find(category => category.parentSkillCategory === selectedParentCategory && category.childSkillCategory === childCategory.value) ? 'border-plump-purple-600 bg-plump-purple-50 text-plump-purple-600' : 'border-slate-200 text-slate-800'} transition-all`}
                            onClick={() => {
                                onChildCategoryListItemClick({
                                    parentSkillCategory: selectedParentCategory,
                                    childSkillCategory: childCategory.value,
                                });
                            }}
                        >
                            {childCategory.label}
                        </li>
                    );
                },
            )}
        </ul>
    );
}

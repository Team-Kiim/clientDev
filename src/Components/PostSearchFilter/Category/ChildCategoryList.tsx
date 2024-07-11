import { CATEGORIES } from '@/Constants/categories.ts';

interface Props {
    selectedParentCategory: string;
    selectedCategories: {
        parentCategory: string;
        childCategory: string;
    }[];
    updateSelectedCategories(newCategory: { parentCategory: string; childCategory: string }): void;
}

export default function ChildCategoryList({
    selectedParentCategory,
    selectedCategories,
    updateSelectedCategories,
}: Props) {
    return (
        <ul className={'flex w-1/2 flex-col gap-y-2 overflow-y-scroll overscroll-y-contain px-2 py-3 scrollbar-hide'}>
            {CATEGORIES.find(parentCategory => parentCategory.value === selectedParentCategory).childCategories.map(
                childCategory => {
                    return (
                        <li
                            key={childCategory.value}
                            className={
                                'flex shrink-0 cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-[0.85rem] font-bold transition-all hover:bg-violet-100'
                            }
                            onClick={() => {
                                updateSelectedCategories({
                                    parentCategory: selectedParentCategory,
                                    childCategory: childCategory.value,
                                });
                            }}
                        >
                            <span>{childCategory.label}</span>
                            <div
                                className={`size-2 ${selectedCategories.find(category => category.parentCategory === selectedParentCategory && category.childCategory === childCategory.value) ? 'bg-violet-600' : 'bg-slate-300'} rounded-full transition-all`}
                            />
                        </li>
                    );
                },
            )}
        </ul>
    );
}

import { CATEGORIES } from '@/Constants/categories.ts';
import CategoryListItem from '@/Pages/user/Components/CategoryUpdate/CategoryListItem.tsx';

interface Props {
    selectedParentCategory: string;
    selectedCategories: {
        parentSkillCategory: string;
        childSkillCategory: string;
    }[];
    updateSelectedCategories(newCategory: { parentSkillCategory: string; childSkillCategory: string }): void;
}

export default function CategoryList({ selectedParentCategory, selectedCategories, updateSelectedCategories }: Props) {
    return (
        <ul className={'flex h-40 w-full flex-wrap content-start gap-x-2 overflow-y-auto p-2 scrollbar-hide'}>
            {CATEGORIES.find(parentCategory => parentCategory.value === selectedParentCategory).childCategories.map(
                childCategory => {
                    return (
                        <CategoryListItem
                            key={childCategory.value}
                            parentCategory={selectedParentCategory}
                            childCategory={childCategory}
                            selectedCategories={selectedCategories}
                            updateSelectedCategories={updateSelectedCategories}
                        />
                    );
                },
            )}
        </ul>
    );
}

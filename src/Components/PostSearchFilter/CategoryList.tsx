import { CATEGORIES } from '@/Constants/categories.ts';
import CategoryListItem from '@/Components/PostSearchFilter/CategoryListItem.tsx';

interface Props {
    selectedParentCategory: string;
    selectedCategories: {
        parentCategory: string;
        childCategory: string;
    }[];
    updateSelectedCategories(newCategory: { parentCategory: string; childCategory: string }): void;
}

export default function CategoryList({ selectedParentCategory, selectedCategories, updateSelectedCategories }: Props) {
    return (
        <ul className={'flex h-full w-full flex-wrap content-start gap-x-2 overflow-y-auto p-2'}>
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

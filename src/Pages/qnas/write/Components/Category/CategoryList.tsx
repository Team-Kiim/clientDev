import CategoryListItem from '@/Pages/qnas/write/Components/Category/CategoryListItem.tsx';
import { CATEGORIES } from '@/Constants/categories.ts';

interface Props {
    selectedParentCategory: string;
    selectedCategories: { parentCategory: string; childCategory: string }[];
    updateSelectedCategories(newCategory: { parentCategory: string; childCategory: string }): void;
}

export default function CategoryList({ selectedParentCategory, selectedCategories, updateSelectedCategories }: Props) {
    return (
        <ul className={'mt-2 flex h-[8rem] w-full flex-wrap content-start gap-x-2 overflow-y-auto'}>
            {CATEGORIES.find(parentCategory => parentCategory.value === selectedParentCategory).childCategories.map(
                childCategory => {
                    return (
                        <CategoryListItem
                            key={childCategory.value}
                            selectedCategories={selectedCategories}
                            parentCategory={selectedParentCategory}
                            childCategory={childCategory}
                            updateSelectedCategories={updateSelectedCategories}
                        />
                    );
                },
            )}
        </ul>
    );
}

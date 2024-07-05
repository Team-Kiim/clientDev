interface Props {
    parentCategory: string;
    childCategory: {
        value: string;
        label: string;
    };
    selectedCategories: {
        parentCategory: string;
        childCategory: string;
    }[];
    updateSelectedCategories(newCategory: { parentCategory: string; childCategory: string }): void;
}

export default function CategoryListItem({
    parentCategory,
    childCategory,
    selectedCategories,
    updateSelectedCategories,
}: Props) {
    return (
        <li
            className={`my-1.5 cursor-pointer rounded-lg bg-slate-100 px-2.5 py-1.5 text-[0.8rem] font-bold ${selectedCategories.find(category => category.parentCategory === parentCategory && category.childCategory === childCategory.value) ? 'bg-violet-600 text-white' : 'bg-gray-100 text-black'} transition-all`}
            onClick={() => {
                updateSelectedCategories({
                    parentCategory,
                    childCategory: childCategory.value,
                });
            }}
        >
            {childCategory.label}
        </li>
    );
}

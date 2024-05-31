interface Props {
    parentCategory: string;
    childCategory: {
        value: string;
        label: string;
    };
    selectedCategories: {
        parentSkillCategory: string;
        childSkillCategory: string;
    }[];
    updateSelectedCategories(newCategory: { parentSkillCategory: string; childSkillCategory: string }): void;
}

export default function CategoryListItem({
    parentCategory,
    childCategory,
    selectedCategories,
    updateSelectedCategories,
}: Props) {
    return (
        <li
            className={`my-1.5 cursor-pointer rounded-2xl bg-gray-100 px-2.5 py-1.5 text-[0.8rem] font-bold ${selectedCategories.find(category => category.parentSkillCategory === parentCategory && category.childSkillCategory === childCategory.value) ? 'bg-violet-600 text-white' : 'bg-gray-100 text-black'} transition-all`}
            onClick={() => {
                updateSelectedCategories({
                    parentSkillCategory: parentCategory,
                    childSkillCategory: childCategory.value,
                });
            }}
        >
            {childCategory.label}
        </li>
    );
}

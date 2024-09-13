import { useSearchParams } from 'react-router-dom';
import { HiXMark } from 'react-icons/hi2';
import { CATEGORIES } from '@/Constants/categories.ts';

export default function SelectedCategoryList() {
    const [searchParams, setSearchParams] = useSearchParams();

    const childCategories = CATEGORIES.map(category => category.childCategories).flat();

    const selectedSkillCategories = searchParams.getAll('category') ?? [];

    const handleDeleteSelectedSkillCategoryButtonClick = (skillCategoryToDelete: string) => {
        searchParams.delete('category');
        for (const selectedSkillCategory of selectedSkillCategories) {
            if (skillCategoryToDelete !== selectedSkillCategory) {
                searchParams.append('category', selectedSkillCategory);
            }
        }
        setSearchParams(searchParams);
    };

    return (
        <ul
            className={
                'flex h-11 flex-1 flex-wrap items-center gap-x-1.5 gap-y-2 overflow-y-scroll overscroll-y-contain py-2 scrollbar-hide'
            }
        >
            {selectedSkillCategories.map(selectedSkillCategory => (
                <li
                    className={
                        'flex flex-shrink-0 items-center justify-between gap-x-2 rounded-lg bg-slate-100 px-3 py-1.5 text-[0.75rem] font-bold'
                    }
                >
                    <span>
                        {childCategories.find(childCategory => childCategory.value === selectedSkillCategory).label}
                    </span>
                    <button
                        onClick={() => {
                            handleDeleteSelectedSkillCategoryButtonClick(selectedSkillCategory);
                        }}
                    >
                        <HiXMark className={'size-4 text-slate-500'} />
                    </button>
                </li>
            ))}
        </ul>
    );
}

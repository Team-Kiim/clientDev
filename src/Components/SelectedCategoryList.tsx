import { useSearchParams } from 'react-router-dom';
import { HiXMark } from 'react-icons/hi2';
import { CATEGORIES } from '@/Constants/categories.ts';

export default function SelectedCategoryList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const childCategories = CATEGORIES.map(category => category.childCategories).flat();
    const selectedChildCategories = searchParams.getAll('category');

    const deleteCategory = (category: string) => {
        searchParams.delete('category');
        for (const selectedChildCategory of selectedChildCategories) {
            if (category !== selectedChildCategory) {
                searchParams.append('category', selectedChildCategory);
            }
        }
        setSearchParams(searchParams);
    };

    return (
        <div className={'mx-6 shrink-0 flex-grow basis-0 overflow-x-auto'}>
            <ul className={'flex w-full items-center gap-x-2.5 overflow-x-auto'}>
                {selectedChildCategories.map(selectedChildCategory => {
                    return (
                        <li
                            className={
                                'flex shrink-0 items-center justify-between gap-x-2 rounded-xl border border-slate-300 px-4 py-2 text-[0.85rem] font-bold'
                            }
                        >
                            <span>
                                {
                                    childCategories.find(childCategory => childCategory.value === selectedChildCategory)
                                        .label
                                }
                            </span>
                            <button
                                onClick={() => {
                                    deleteCategory(selectedChildCategory);
                                }}
                            >
                                <HiXMark className={'size-4 text-slate-500'} />
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

import { useSearchParams } from 'react-router-dom';
import { CATEGORIES } from '@/Constants/categories.ts';

export default function SelectedCategoryList() {
    const [searchParams] = useSearchParams();
    const childCategories = CATEGORIES.map(category => category.childCategories).flat();
    const selectedChildCategories = searchParams.getAll('category');

    return (
        <div className={'mx-6 shrink-0 flex-grow basis-0 overflow-x-auto'}>
            <ul className={'flex w-full items-center gap-x-3 overflow-x-auto'}>
                {selectedChildCategories.map(selectedChildCategory => {
                    return (
                        <li className={'rounded-2xl bg-slate-100 px-4 py-2.5 text-[0.95rem] font-extrabold'}>
                            {childCategories.find(childCategory => childCategory.value === selectedChildCategory).label}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

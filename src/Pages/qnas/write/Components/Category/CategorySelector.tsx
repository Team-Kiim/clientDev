import { useState } from 'react';
import { CATEGORIES } from '@/Constants/categories.ts';
import CategoryList from '@/Pages/qnas/write/Components/Category/CategoryList.tsx';

interface Props {
    selectedCategories: { parentCategory: string; childCategory: string }[];
    updateSelectedCategories(newCategory: { parentCategory: string; childCategory: string }): void;
}

export default function CategorySelector({ selectedCategories, updateSelectedCategories }: Props) {
    const [selectedParentCategory, setSelectedParentCategory] = useState(CATEGORIES[0].value);

    return (
        <div className={'flex w-full flex-col gap-y-2'}>
            <h3 className={'mx-1 text-[0.95rem] font-bold'}>카테고리</h3>
            <div className={'w-full'}>
                <div className={'w-full border-b border-gray-300 py-2'}>
                    <ul className={'flex w-full items-center gap-x-2 overflow-x-scroll scrollbar-hide'}>
                        {CATEGORIES.map(category => {
                            return (
                                <li
                                    key={category.value}
                                    className={`shrink-0 cursor-pointer rounded-lg px-3 py-2 text-[0.9rem] font-bold ${category.value === selectedParentCategory ? 'bg-slate-100 font-bold text-black' : 'bg-white text-slate-500'}`}
                                    onClick={() => {
                                        setSelectedParentCategory(category.value);
                                    }}
                                >
                                    {category.label}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <CategoryList
                    selectedCategories={selectedCategories}
                    selectedParentCategory={selectedParentCategory}
                    updateSelectedCategories={updateSelectedCategories}
                />
            </div>
        </div>
    );
}

import { isEqual } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import useDropdown from '@/Hooks/useDropdown.ts';
import CategoryList from '@/Components/PostSearchFilter/CategoryList.tsx';
import { CATEGORIES } from '@/Constants/categories.ts';

interface Props {
    isDropdownOpen: boolean;
    closeCategorySelectDropdown(): void;
}

export default function CategorySelectDropdown({ isDropdownOpen, closeCategorySelectDropdown }: Props) {
    const [selectedParentCategory, setSelectedParentCategory] = useState(CATEGORIES[0].value);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedCategories, setSelectedCategories] = useState<
        {
            parentCategory: string;
            childCategory: string;
        }[]
    >(() => {
        const selectedChildCategories = searchParams.getAll('category');
        if (selectedChildCategories.length === 0) {
            return [];
        } else {
            const initialCategories: { parentCategory: string; childCategory: string }[] = [];
            for (const selectedChildCategory of selectedChildCategories) {
                for (const category of CATEGORIES) {
                    for (const childCategory of category.childCategories) {
                        if (childCategory.value === selectedChildCategory) {
                            initialCategories.push({
                                childCategory: selectedChildCategory,
                                parentCategory: category.value,
                            });
                        }
                    }
                }
            }
            return initialCategories;
        }
    });

    useEffect(() => {
        const selectedChildCategories = searchParams.getAll('category');
        if (selectedChildCategories.length === 0) {
            setSelectedCategories([]);
        } else {
            const initialCategories: { parentCategory: string; childCategory: string }[] = [];
            for (const selectedChildCategory of selectedChildCategories) {
                for (const category of CATEGORIES) {
                    for (const childCategory of category.childCategories) {
                        if (childCategory.value === selectedChildCategory) {
                            initialCategories.push({
                                childCategory: selectedChildCategory,
                                parentCategory: category.value,
                            });
                        }
                    }
                }
            }
            setSelectedCategories(initialCategories);
        }
    }, [searchParams]);

    useDropdown(dropdownRef, isDropdownOpen, closeCategorySelectDropdown);

    const updateSelectedCategories = (newCategory: { parentCategory: string; childCategory: string }) => {
        for (const category of selectedCategories) {
            if (isEqual(category, newCategory)) {
                setSelectedCategories(
                    selectedCategories.filter(category => {
                        return !isEqual(category, newCategory);
                    }),
                );
                return;
            }
        }
        setSelectedCategories([...selectedCategories, newCategory]);
    };

    const handleApplyButtonClick = () => {
        searchParams.set('page', '1');
        if (selectedCategories.length === 0) {
            searchParams.delete('category');
            setSearchParams(searchParams);
        } else {
            searchParams.delete('category');
            for (const category of selectedCategories) {
                searchParams.append('category', category.childCategory);
            }
            setSearchParams(searchParams);
        }
        closeCategorySelectDropdown();
    };

    const handleCategoryResetButtonClick = () => {
        searchParams.set('page', '1');
        if (selectedCategories.length === 0) {
            return;
        }
        searchParams.delete('category');
        setSearchParams(searchParams);
        closeCategorySelectDropdown();
    };

    return (
        <div
            className={
                'absolute top-[3.5rem] z-10 flex h-[17rem] w-[40rem] flex-col justify-between rounded-lg border border-slate-200 bg-white shadow-lg'
            }
            ref={dropdownRef}
        >
            <div className={'w-full border-b border-slate-200 p-2'}>
                <ul className={'flex w-full items-center gap-x-1'}>
                    {CATEGORIES.map(category => {
                        return (
                            <li
                                key={category.value}
                                className={`shrink-0 cursor-pointer rounded-lg px-2.5 py-1.5 text-[0.85rem] ${category.value === selectedParentCategory ? 'bg-slate-100 font-bold' : 'bg-white font-normal'}`}
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
                selectedParentCategory={selectedParentCategory}
                selectedCategories={selectedCategories}
                updateSelectedCategories={updateSelectedCategories}
            />
            <div className={'flex items-center justify-between border-t border-slate-200 p-2'}>
                <button
                    className={
                        'flex items-center gap-x-1.5 rounded-lg px-3 py-2.5 text-[0.85rem] transition-all hover:bg-gray-100'
                    }
                    type={'button'}
                    onClick={handleCategoryResetButtonClick}
                >
                    <ArrowPathIcon className={'size-5'} />
                    <span className={'font-bold'}>초기화</span>
                </button>
                <button
                    className={
                        'rounded-lg bg-violet-600 px-4 py-2.5 text-[0.85rem] font-bold text-white transition-all hover:bg-violet-700'
                    }
                    type={'button'}
                    onClick={handleApplyButtonClick}
                >
                    적용
                </button>
            </div>
        </div>
    );
}

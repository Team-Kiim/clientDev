import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HiOutlineArrowPath } from 'react-icons/hi2';
import { CATEGORIES } from '@/Constants/categories.ts';
import ParentCategoryList from '@/Components/PostSearchFilter/Category/ParentCategoryList.tsx';
import ChildCategoryList from '@/Components/PostSearchFilter/Category/ChildCategoryList.tsx';

interface Props {
    closeCategorySetDropdown(): void;
}

export default function CategorySetDropdown({ closeCategorySetDropdown }: Props) {
    const [selectedParentCategory, setSelectedParentCategory] = useState(CATEGORIES[0].value);
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
        }

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
    });

    useEffect(() => {
        const selectedChildCategories = searchParams.getAll('category');
        if (selectedChildCategories.length === 0) {
            setSelectedCategories([]);
            return;
        }

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
    }, [searchParams]);

    const updateSelectedParentCategory = (newParentCategory: string) => {
        if (newParentCategory === selectedParentCategory) {
            return;
        }
        setSelectedParentCategory(newParentCategory);
    };

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
        } else {
            searchParams.delete('category');
            for (const category of selectedCategories) {
                searchParams.append('category', category.childCategory);
            }
        }
        setSearchParams(searchParams);
        closeCategorySetDropdown();
    };

    const handleCategoryResetButtonClick = () => {
        if (selectedCategories.length === 0) {
            return;
        }

        searchParams.set('page', '1');
        searchParams.delete('category');
        setSearchParams(searchParams);
        closeCategorySetDropdown();
    };

    return (
        <div
            className={'absolute left-0 top-16 z-10 flex h-[30rem] w-[38rem] flex-col rounded-2xl bg-white shadow-2xl'}
        >
            {/*overflow-hidden 스타일을 추가함으로써, 자식 컴포넌트가 부모 컴포넌트의 높이를 넘지 않도록 함. -> 
               자식 컴포넌트 내에서 스크롤 정상 작동
            */}
            <div className={'flex w-full shrink-0 flex-grow basis-0 overflow-hidden'}>
                <ParentCategoryList
                    selectedParentCategory={selectedParentCategory}
                    updateSelectedParentCategory={updateSelectedParentCategory}
                />
                <ChildCategoryList
                    selectedParentCategory={selectedParentCategory}
                    selectedCategories={selectedCategories}
                    updateSelectedCategories={updateSelectedCategories}
                />
            </div>
            <div className={'flex items-center justify-between border-t border-slate-200 px-3 py-3.5'}>
                <button
                    className={
                        'flex items-center gap-x-1.5 rounded-xl px-3 py-2.5 text-[0.9rem] transition-all hover:bg-slate-100'
                    }
                    type={'button'}
                    onClick={handleCategoryResetButtonClick}
                >
                    <HiOutlineArrowPath className={'size-5'} />
                    <span className={'font-bold'}>초기화</span>
                </button>
                <button
                    className={
                        'rounded-xl bg-violet-600 px-6 py-2.5 text-[0.9rem] font-bold text-white transition-all hover:bg-violet-700'
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

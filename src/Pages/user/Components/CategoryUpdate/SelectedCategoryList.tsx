import { CATEGORIES } from '@/Constants/categories.ts';
import { HiXMark } from 'react-icons/hi2';
import { useEffect, useRef } from 'react';

interface Category {
    parentSkillCategory: string;
    childSkillCategory: string;
}

interface Props {
    selectedCategories: Category[];
    onSelectedCategoryDeleteButtonClick(selectedCategory: Category): void;
}

export default function SelectedCategoryList({ selectedCategories, onSelectedCategoryDeleteButtonClick }: Props) {
    const childCategoryList = CATEGORIES.map(category => category.childCategories).flat();
    const selectedCategoryListRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (selectedCategoryListRef.current) {
            selectedCategoryListRef.current.scrollLeft = selectedCategoryListRef.current.scrollWidth;
        }
    }, [selectedCategories]);

    return (
        <>
            {selectedCategories.length === 0 ? (
                <p className={'text-[0.8rem] font-bold text-slate-500'}>
                    선택된 카테고리가 없습니다. 카테고리를 설정해 보세요.
                </p>
            ) : (
                <ul
                    className={'flex shrink-0 flex-grow basis-0 gap-x-2 overflow-x-auto scrollbar-hide'}
                    ref={selectedCategoryListRef}
                >
                    {selectedCategories.map(selectedCategory => {
                        return (
                            <li
                                key={selectedCategory.childSkillCategory}
                                className={
                                    'selectedCategoryList flex shrink-0 items-center justify-between gap-x-2.5 rounded-3xl border border-neutral-800 bg-white px-3 py-1 text-[0.8rem] font-extrabold text-neutral-800'
                                }
                            >
                                <span>
                                    {
                                        childCategoryList.find(childCategory => {
                                            return childCategory.value === selectedCategory.childSkillCategory;
                                        }).label
                                    }
                                </span>
                                <button
                                    type={'button'}
                                    onClick={() => {
                                        onSelectedCategoryDeleteButtonClick(selectedCategory);
                                    }}
                                >
                                    <HiXMark className={'size-4'} />
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
}

import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HashtagIcon } from '@heroicons/react/24/outline';
import CategorySelectDropdown from '@/Components/PostSearchFilter/CategorySelectDropdown.tsx';

export default function SearchFilter() {
    const [isCategorySelectDropdownOpen, setIsCategorySelectDropdownOpen] = useState(false);

    const [searchParams] = useSearchParams();
    const numberOfCurrentCategories = searchParams.getAll('category').length;

    const closeCategorySelectDropdown = () => {
        setIsCategorySelectDropdownOpen(false);
    };

    return (
        <div className={'relative flex items-center gap-x-5'}>
            <button
                className={`flex gap-x-2 rounded-2xl border px-3.5 py-2.5 transition-all ${numberOfCurrentCategories !== 0 ? 'border-violet-600 bg-violet-600 text-white hover:bg-violet-700' : 'border-gray-300 bg-white text-black hover:bg-gray-50'}`}
                type={'button'}
                onClick={event => {
                    event.stopPropagation();
                    setIsCategorySelectDropdownOpen(!isCategorySelectDropdownOpen);
                }}
            >
                <HashtagIcon className={'size-5'} />
                <div className={'flex gap-x-1.5 text-[0.9rem] font-bold'}>
                    <span>카테고리</span>
                    <span className={`${numberOfCurrentCategories !== 0 ? 'text-white' : 'text-violet-700'}`}>
                        {numberOfCurrentCategories}
                    </span>
                </div>
            </button>
            {isCategorySelectDropdownOpen && (
                <CategorySelectDropdown
                    isDropdownOpen={isCategorySelectDropdownOpen}
                    closeCategorySelectDropdown={closeCategorySelectDropdown}
                />
            )}
        </div>
    );
}

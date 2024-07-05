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
                className={`flex gap-x-2 rounded-xl border border-slate-300 px-3 py-2.5 transition-all hover:bg-slate-50`}
                type={'button'}
                onClick={event => {
                    event.stopPropagation();
                    setIsCategorySelectDropdownOpen(!isCategorySelectDropdownOpen);
                }}
            >
                <HashtagIcon className={'size-5'} />
                <div className={'text-[0.85rem] font-bold'}>
                    {numberOfCurrentCategories !== 0 ? (
                        <span>
                            <span className={'text-violet-700'}>{numberOfCurrentCategories}</span>개 적용
                        </span>
                    ) : (
                        <span>카테고리</span>
                    )}
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

import { MdArrowForwardIos } from 'react-icons/md';
import { CATEGORIES } from '@/Constants/categories.ts';

interface Props {
    selectedParentCategory: string;
    updateSelectedParentCategory(newParentCategory: string): void;
}

export default function ParentCategoryList({ selectedParentCategory, updateSelectedParentCategory }: Props) {
    return (
        <ul
            className={
                'flex h-full w-1/2 flex-col gap-y-2 overflow-y-auto overscroll-y-contain border-r border-slate-200 px-2 py-3'
            }
        >
            {CATEGORIES.map(category => {
                return (
                    <li
                        key={category.value}
                        className={`flex shrink-0 cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-[0.85rem] ${category.value === selectedParentCategory ? 'bg-slate-100' : 'bg-white hover:bg-slate-100'} font-bold transition-all`}
                        onClick={() => {
                            updateSelectedParentCategory(category.value);
                        }}
                    >
                        <span>{category.label}</span>
                        <MdArrowForwardIos className={'size-4 text-slate-500'} />
                    </li>
                );
            })}
        </ul>
    );
}

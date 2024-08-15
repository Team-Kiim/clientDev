import { CATEGORIES } from '@/Constants/categories.ts';

interface Props {
    selectedParentCategory: string;
    onParentCategoryListItemClick(parentCategory: string): void;
}

export default function ParentCategoryList({ selectedParentCategory, onParentCategoryListItemClick }: Props) {
    return (
        <ul className={'flex w-full items-center gap-x-1 overflow-x-auto scrollbar-hide'}>
            {CATEGORIES.map(category => {
                return (
                    <li
                        key={category.value}
                        className={`shrink-0 cursor-pointer rounded-xl px-2.5 py-1.5 text-[0.85rem] ${category.value === selectedParentCategory ? 'bg-slate-100 font-bold' : 'bg-white text-slate-400'} font-bold transition-all`}
                        onClick={() => {
                            onParentCategoryListItemClick(category.value);
                        }}
                    >
                        {category.label}
                    </li>
                );
            })}
        </ul>
    );
}

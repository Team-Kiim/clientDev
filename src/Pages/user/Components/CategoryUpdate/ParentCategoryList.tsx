import { CATEGORIES } from '@/Constants/categories.ts';

interface Props {
    selectedParentCategory: string;
    onParentCategoryListItemClick(parentCategory: string): void;
}

export default function ParentCategoryList({ selectedParentCategory, onParentCategoryListItemClick }: Props) {
    return (
        <ul className={'flex w-full flex-wrap items-center gap-x-1 gap-y-2'}>
            {CATEGORIES.map(category => {
                return (
                    <li
                        key={category.value}
                        className={`flex-shrink-0 rounded-3xl border px-4 py-1.5 text-[0.8rem] font-bold ${category.value === selectedParentCategory ? 'border-neutral-800 bg-neutral-800 text-white' : 'border-slate-200 bg-white text-neutral-800 hover:bg-slate-100'} transition-all`}
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

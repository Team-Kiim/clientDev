import { CATEGORIES } from '@/Constants/categories.ts';

interface Props {
    selectedParentSkillCategory: string;
    onParentSkillCategoryListItemClick(parentSkillCategory: string): void;
}

export default function ParentSkillCategoryList({
    selectedParentSkillCategory,
    onParentSkillCategoryListItemClick,
}: Props) {
    return (
        <ul className={'flex w-full flex-wrap items-center gap-1.5'}>
            {CATEGORIES.map(category => {
                return (
                    <li
                        key={category.value}
                        className={`shrink-0 cursor-pointer rounded-3xl border px-2.5 py-1.5 text-[0.8rem] ${category.value === selectedParentSkillCategory ? 'border-slate-800 bg-slate-800 text-white' : 'border-slate-200 bg-white text-slate-800'} font-bold transition-all`}
                        onClick={() => {
                            onParentSkillCategoryListItemClick(category.value);
                        }}
                    >
                        {category.label}
                    </li>
                );
            })}
        </ul>
    );
}

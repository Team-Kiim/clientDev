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
        <ul className={'flex w-full items-center gap-x-1 overflow-x-auto'}>
            {CATEGORIES.map(category => {
                return (
                    <li
                        key={category.value}
                        className={`shrink-0 cursor-pointer rounded-lg px-2.5 py-1.5 text-[0.8rem] ${category.value === selectedParentSkillCategory ? 'bg-slate-100' : 'bg-white text-slate-400'} font-bold transition-all`}
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

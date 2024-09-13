import { CATEGORIES } from '@/Constants/categories.ts';

interface Props {
    selectedParentSkillCategory: string;
    onParentSkillCategoryButtonClick(parentSkillCategory: string): void;
}

export default function ParentSkillCategoryList({
    selectedParentSkillCategory,
    onParentSkillCategoryButtonClick,
}: Props) {
    return (
        <ul className={'flex w-full flex-wrap gap-x-1 gap-y-2 px-3'}>
            {CATEGORIES.map(category => (
                <li key={category.value}>
                    <button
                        className={`rounded-3xl border px-4 py-1.5 text-[0.8rem] font-bold ${category.value === selectedParentSkillCategory ? 'border-neutral-800 bg-neutral-800 text-white' : 'border-slate-200 bg-white text-neutral-800 hover:bg-slate-100'} transition-all`}
                        type={'button'}
                        onClick={() => {
                            onParentSkillCategoryButtonClick(category.value);
                        }}
                    >
                        {category.label}
                    </button>
                </li>
            ))}
        </ul>
    );
}

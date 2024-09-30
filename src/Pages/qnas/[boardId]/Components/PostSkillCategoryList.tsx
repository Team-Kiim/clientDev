import { VscSettings } from 'react-icons/vsc';
import { CATEGORIES } from '@/Constants/categories.ts';

interface Props {
    categories: {
        parentSkillCategory: string;
        childSkillCategory: string;
    }[];
}

export default function PostSkillCategoryList({ categories }: Props) {
    const childSkillCategories = CATEGORIES.map(category => category.childCategories).flat();
    return (
        <div className={'flex w-full items-center gap-x-2'}>
            <div className={'tooltip tooltip-bottom flex items-center'} data-tip={'카테고리'}>
                <VscSettings className={'size-6 text-slate-800'} />
            </div>

            <ul className={'flex min-w-0 flex-1 flex-wrap gap-2'}>
                {categories.map(category => (
                    <li
                        key={category.childSkillCategory}
                        className={'rounded-xl bg-slate-100 px-3 py-2 text-[0.8rem] font-bold text-slate-800'}
                    >
                        {
                            childSkillCategories.find(
                                childSkillCategory => childSkillCategory.value === category.childSkillCategory,
                            ).label
                        }
                    </li>
                ))}
            </ul>
        </div>
    );
}

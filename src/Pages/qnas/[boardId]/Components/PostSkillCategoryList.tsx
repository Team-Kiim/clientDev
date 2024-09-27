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
        <ul className={'mb-5 mt-7 flex items-center gap-x-2.5'}>
            {categories.map(category => {
                return (
                    <li className={'rounded-xl bg-gray-100 px-3 py-2 text-[0.8rem] font-bold text-gray-700'}>
                        {
                            childSkillCategories.find(
                                childSkillCategory => childSkillCategory.value === category.childSkillCategory,
                            ).label
                        }
                    </li>
                );
            })}
        </ul>
    );
}

import { CATEGORIES } from '@/Constants/categories.ts';

interface Props {
    interestSkillCategories: {
        parentSkillCategory: string;
        childSkillCategory: string;
    }[];
}

export default function InterestCategoryList({ interestSkillCategories }: Props) {
    const childCategories = CATEGORIES.map(category => category.childCategories).flat();
    const interestChildCategories: string[] = [];
    for (const interestSkillCategory of interestSkillCategories) {
        for (const childCategory of childCategories) {
            if (childCategory.value === interestSkillCategory.childSkillCategory) {
                interestChildCategories.push(childCategory.label);
            }
        }
    }

    return (
        <>
            {interestChildCategories.length === 0 ? (
                <div>
                    <p className={'text-[0.9rem] text-slate-600'}>
                        관심 카테고리가 없습니다. 관심 카테고리를 설정해보세요.
                    </p>
                </div>
            ) : (
                <ul className={'flex w-full flex-wrap gap-x-2.5'}>
                    {interestChildCategories.map(interestChildCategory => {
                        return (
                            <li
                                key={interestChildCategory}
                                className={'mb-2 rounded-3xl bg-slate-100 px-3 py-2 text-[0.9rem] font-bold'}
                            >
                                {interestChildCategory}
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
}

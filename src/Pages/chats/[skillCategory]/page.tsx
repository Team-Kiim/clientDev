import { useParams } from 'react-router-dom';
import SkillPostList from '@/Pages/chats/[skillCategory]/Components/SkillPost/SkillPostList.tsx';
import ChatRoom from '@/Pages/chats/[skillCategory]/Components/ChatRoom/ChatRoom.tsx';
import { CATEGORIES } from '@/Constants/categories.ts';

export default function Page() {
    const skillCategoryValue = useParams().skillCategory.toUpperCase();

    const childSkillCategoryList = CATEGORIES.map(category => category.childCategories).flat();

    const skillCategoryLabel = childSkillCategoryList.find(
        childSkillCategory => childSkillCategory.value === skillCategoryValue,
    ).label;

    return (
        <div className={'mt-8 flex w-full min-w-[1500px] justify-center'}>
            <div className={'flex w-[80rem] gap-x-4'}>
                <div className={'shrink-0 flex-grow basis-0'}>
                    <SkillPostList skillCategoryLabel={skillCategoryLabel} />
                </div>
                <div className={'h-[42rem] w-[35rem] rounded-xl border border-slate-200'}>
                    <ChatRoom skillCategoryLabel={skillCategoryLabel} skillCategoryValue={skillCategoryValue} />
                </div>
                <div className={'shrink-0 flex-grow basis-0'}></div>
            </div>
        </div>
    );
}

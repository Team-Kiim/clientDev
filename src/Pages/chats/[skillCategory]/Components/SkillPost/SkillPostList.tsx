import SkillPostListItem from '@/Pages/chats/[skillCategory]/Components/SkillPost/SkillPostListItem.tsx';

interface Props {
    skillCategoryLabel: string;
}

export default function SkillPostList({ skillCategoryLabel }: Props) {
    return (
        <div className={'flex h-[42rem] w-[22rem] flex-col gap-y-1 rounded-xl border border-slate-200'}>
            <div className={'flex items-center gap-x-2 p-4'}>
                <h2 className={'text-[0.95rem] font-extrabold'}>
                    실시간 &nbsp;
                    <span className={'text-violet-500'}>{skillCategoryLabel}</span> &nbsp;관련 게시글
                </h2>
            </div>
            <div className={'shrink-0 flex-grow basis-0 overflow-y-auto'}>
                <ul className={'h-full w-full overflow-y-auto'}>
                    {Array.from(new Array(10).keys()).map(e => {
                        return <SkillPostListItem key={e} />;
                    })}
                </ul>
            </div>
        </div>
    );
}

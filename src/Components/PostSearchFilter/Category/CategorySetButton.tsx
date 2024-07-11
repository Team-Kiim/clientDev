import { LuSettings2 } from 'react-icons/lu';

interface Props {
    onCategorySetButtonClick(): void;
}

export default function CategorySetButton({ onCategorySetButtonClick }: Props) {
    return (
        <button
            className={
                'flex gap-x-2 rounded-3xl border border-slate-200 px-3 py-2.5 shadow-md transition-all hover:bg-slate-50'
            }
            type={'button'}
            onClick={() => {
                onCategorySetButtonClick();
            }}
        >
            <LuSettings2 className={'size-5'} />
            <div className={'text-[0.85rem] font-bold'}>카테고리</div>
        </button>
    );
}

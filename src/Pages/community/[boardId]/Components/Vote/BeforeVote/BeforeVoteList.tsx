import { GoDotFill } from 'react-icons/go';

interface Props {
    selectedVoteItem: string;
    updateSelectedVoteItem(voteItem: string): void;
}

export default function BeforeVoteList({ selectedVoteItem, updateSelectedVoteItem }: Props) {
    return (
        <ul className={'flex flex-col gap-y-3'}>
            <li
                className={
                    'flex cursor-pointer justify-between rounded-lg border border-slate-200 px-2.5 py-3 transition-all hover:bg-slate-50'
                }
                onClick={() => {
                    updateSelectedVoteItem('자바스크립트');
                }}
            >
                <div className={'flex items-center gap-x-1.5'}>
                    <GoDotFill className={'size-3 text-slate-400'} />
                    <span className={'text-[0.85rem]'}>자바스크립트</span>
                </div>
                <input
                    className={'radio radio-sm checked:bg-violet-600'}
                    type={'radio'}
                    name={'customVote'}
                    value={'자바스크립트'}
                    checked={selectedVoteItem === '자바스크립트'}
                />
            </li>
            <li
                className={
                    'flex cursor-pointer justify-between rounded-lg border border-slate-200 px-2.5 py-3 transition-all hover:bg-slate-50'
                }
                onClick={() => {
                    updateSelectedVoteItem('타입스크립트');
                }}
            >
                <div className={'flex items-center gap-x-1.5'}>
                    <GoDotFill className={'size-3 text-slate-400'} />
                    <span className={'text-[0.85rem]'}>타입스크립트</span>
                </div>
                <input
                    className={'radio radio-sm checked:bg-violet-600'}
                    type={'radio'}
                    name={'customVote'}
                    value={'타입스크립트'}
                    checked={selectedVoteItem === '타입스크립트'}
                />
            </li>
            <li
                className={
                    'flex cursor-pointer justify-between rounded-lg border border-slate-200 px-2.5 py-3 transition-all hover:bg-slate-50'
                }
                onClick={() => {
                    updateSelectedVoteItem('파이썬');
                }}
            >
                <div className={'flex items-center gap-x-1.5'}>
                    <GoDotFill className={'size-3 text-slate-400'} />
                    <span className={'text-[0.85rem]'}>파이썬</span>
                </div>
                <input
                    className={'radio radio-sm checked:bg-violet-600'}
                    type={'radio'}
                    name={'customVote'}
                    value={'파이썬'}
                    checked={selectedVoteItem === '파이썬'}
                />
            </li>
        </ul>
    );
}

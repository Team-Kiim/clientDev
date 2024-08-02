import { GoDotFill } from 'react-icons/go';

interface Props {
    selectedVoteItemId: number;
    updateSelectedVoteItem(voteItemId: number): void;
    voteItems: {
        voteItemId: number;
        voteItem: string;
        voteCount: number;
    }[];
}

export default function BeforeVoteList({ voteItems, selectedVoteItemId, updateSelectedVoteItem }: Props) {
    return (
        <ul className={'flex flex-col gap-y-3'}>
            {voteItems.map(voteInfo => {
                return (
                    <li
                        key={voteInfo.voteItemId}
                        className={
                            'flex cursor-pointer justify-between rounded-lg border border-slate-200 px-2.5 py-3 transition-all hover:bg-slate-50'
                        }
                        onClick={() => {
                            updateSelectedVoteItem(voteInfo.voteItemId);
                        }}
                    >
                        <div className={'flex items-center gap-x-1.5'}>
                            <GoDotFill className={'size-3 text-slate-400'} />
                            <span className={'text-[0.85rem]'}>{voteInfo.voteItem}</span>
                        </div>
                        <input
                            className={'radio radio-sm checked:bg-violet-600'}
                            type={'radio'}
                            name={'customVote'}
                            value={'자바스크립트'}
                            checked={selectedVoteItemId === voteInfo.voteItemId}
                        />
                    </li>
                );
            })}
        </ul>
    );
}

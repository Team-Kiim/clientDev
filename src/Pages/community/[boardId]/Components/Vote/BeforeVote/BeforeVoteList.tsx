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
                        <div
                            className={`flex size-5 items-center justify-center rounded-full border ${voteInfo.voteItemId === selectedVoteItemId ? 'border-plump-purple-600' : 'border-slate-300'}`}
                        >
                            {selectedVoteItemId === voteInfo.voteItemId && (
                                <div className={'size-3 rounded-full bg-plump-purple-600'} />
                            )}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

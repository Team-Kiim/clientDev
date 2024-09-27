import { GoDotFill } from 'react-icons/go';

interface Props {
    voteItems: {
        voteItemId: number;
        voteItem: string;
        voteCount: number;
    }[];
    totalVoteCount: number;
}

export default function AfterVoteList({ voteItems, totalVoteCount }: Props) {
    return (
        <ul className={'flex flex-col gap-y-3'}>
            {voteItems.map(voteItem => {
                return (
                    <li
                        className={
                            'flex w-full items-center gap-x-1.5 rounded-lg border border-slate-200 px-2.5 py-3 transition-all hover:bg-slate-50'
                        }
                        key={voteItem.voteItemId}
                    >
                        <GoDotFill className={'size-3 text-slate-400'} />
                        <div className={'flex w-full flex-col'}>
                            <span className={'text-[0.85rem]'}>자바스크립트</span>
                            <div className={'flex items-center gap-x-3.5'}>
                                <progress
                                    className={
                                        'progress w-1/2 bg-slate-300 [&::-moz-progress-bar]:bg-plump-purple-600 [&::-webkit-progress-value]:bg-plump-purple-600'
                                    }
                                    value={voteItem.voteCount}
                                    max={totalVoteCount}
                                />
                                <div className={'text-[0.75rem]'}>
                                    <span>
                                        <span className={'font-bold'}>
                                            {((voteItem.voteCount / totalVoteCount) * 100).toFixed(2)}%
                                        </span>{' '}
                                        ( {voteItem.voteCount}명 투표 )
                                    </span>
                                </div>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

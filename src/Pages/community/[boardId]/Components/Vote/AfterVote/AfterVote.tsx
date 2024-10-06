import { CiRedo } from 'react-icons/ci';
import AfterVoteList from '@/Pages/community/[boardId]/Components/Vote/AfterVote/AfterVoteList.tsx';

interface Props {
    voteItems: {
        voteItemId: number;
        voteItemText: string;
        voteCount: number;
    }[];
    totalVoteCount: number;
    onReVoteButtonClick(): void;
}

export default function AfterVote({ totalVoteCount, voteItems, onReVoteButtonClick }: Props) {
    return (
        <>
            <div>
                <AfterVoteList voteItems={voteItems} totalVoteCount={totalVoteCount} />
            </div>
            <div className={'flex justify-end'}>
                <div className={'tooltip tooltip-bottom'} data-tip={'재투표'}>
                    <button
                        className={'rounded-full p-1.5 transition-all hover:bg-slate-50'}
                        type={'button'}
                        onClick={onReVoteButtonClick}
                    >
                        <CiRedo className={'size-6'} />
                    </button>
                </div>
            </div>
        </>
    );
}

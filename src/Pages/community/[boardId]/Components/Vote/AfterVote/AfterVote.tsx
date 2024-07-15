import { CiRedo } from 'react-icons/ci';
import AfterVoteList from '@/Pages/community/[boardId]/Components/Vote/AfterVote/AfterVoteList.tsx';

export default function AfterVote() {
    return (
        <>
            <div>
                <AfterVoteList />
            </div>
            <div className={'flex justify-end'}>
                <div className={'tooltip tooltip-bottom'} data-tip={'재투표'}>
                    <button className={'rounded-full p-1.5 transition-all hover:bg-slate-50'} type={'button'}>
                        <CiRedo className={'size-6'} />
                    </button>
                </div>
            </div>
        </>
    );
}

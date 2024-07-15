import { useState } from 'react';
import { MdOutlineHowToVote } from 'react-icons/md';
import BeforeVoteList from '@/Pages/community/[boardId]/Components/Vote/BeforeVote/BeforeVoteList.tsx';

export default function BeforeVote() {
    const [selectedVoteItem, setSelectedVoteItem] = useState('');

    const updateSelectedVoteItem = (voteItem: string) => {
        setSelectedVoteItem(voteItem);
    };

    const handleVoteButtonClick = () => {
        if (selectedVoteItem === '') {
            window.alert('투표 항목을 선택해주세요.');
        } else {
            window.alert(selectedVoteItem);
        }
    };

    return (
        <>
            <div>
                <BeforeVoteList selectedVoteItem={selectedVoteItem} updateSelectedVoteItem={updateSelectedVoteItem} />
            </div>
            <div className={'flex justify-end'}>
                <div className={'tooltip tooltip-bottom'} data-tip={'투표하기'}>
                    <button
                        className={'rounded-full p-1.5 transition-all hover:bg-slate-50'}
                        type={'button'}
                        onClick={handleVoteButtonClick}
                    >
                        <MdOutlineHowToVote className={'size-6'} />
                    </button>
                </div>
            </div>
        </>
    );
}

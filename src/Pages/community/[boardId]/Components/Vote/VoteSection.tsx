import axios from 'axios';
import { GoPeople } from 'react-icons/go';
import { useParams } from 'react-router-dom';
import BeforeVote from '@/Pages/community/[boardId]/Components/Vote/BeforeVote/BeforeVote.tsx';
import AfterVote from '@/Pages/community/[boardId]/Components/Vote/AfterVote/AfterVote.tsx';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
    voteTopic: string;
    voteItems: {
        voteItemId: number;
        voteItemText: string;
        voteCount: number;
    }[];
    memberVoted: boolean;
}

export default function VoteSection({ voteTopic, voteItems, memberVoted }: Props) {
    const queryClient = useQueryClient();

    const postId = useParams().postId;

    const totalVoteCount = voteItems.reduce((acc, currentVoteInfo) => (acc += currentVoteInfo.voteCount), 0);

    const handleReVoteButtonClick = async () => {
        try {
            await axios.post(`/api/vote/${postId}/votes`, {
                items: [],
            });
            await queryClient.invalidateQueries({
                queryKey: ['post', postId],
            });
        } catch (error) {}
    };

    return (
        <div className={'flex flex-col gap-y-4 rounded-xl border border-slate-200 px-5 pb-1 pt-4'}>
            <div className={'flex justify-between px-1'}>
                <h3 className={'text-[0.9rem] font-extrabold'}>{voteTopic}</h3>
                <div className={'flex items-center gap-x-2 text-slate-500'}>
                    <GoPeople className={'size-4'} />
                    <span className={'text-[0.75rem]'}>{totalVoteCount}명 참여</span>
                </div>
            </div>
            {memberVoted ? (
                <AfterVote
                    voteItems={voteItems}
                    totalVoteCount={totalVoteCount}
                    onReVoteButtonClick={handleReVoteButtonClick}
                />
            ) : (
                <BeforeVote postId={postId} voteItems={voteItems} />
            )}
        </div>
    );
}

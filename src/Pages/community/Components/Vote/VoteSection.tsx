import VoteTopicField from '@/Pages/community/Components/Vote/VoteTopicField.tsx';
import VoteItemFields from '@/Pages/community/Components/Vote/VoteItemFields.tsx';

interface Props {
    isVoteEditable: boolean;
}

export default function VoteSection({ isVoteEditable }: Props) {
    return (
        <div className={'flex w-full flex-col gap-y-10 rounded-lg '}>
            <VoteTopicField isVoteEditable={isVoteEditable} />
            <VoteItemFields isVoteEditable={isVoteEditable} />
        </div>
    );
}

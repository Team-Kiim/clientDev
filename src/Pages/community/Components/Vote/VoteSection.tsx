import VoteTopicInput from '@/Pages/community/Components/Vote/VoteTopicInput.tsx';
import VoteItemInputs from '@/Pages/community/Components/Vote/VoteItemInputs.tsx';

export default function VoteSection() {
    return (
        <div className={'flex w-full flex-col gap-y-10 rounded-lg border border-slate-300 px-4 py-6'}>
            <VoteTopicInput />
            <VoteItemInputs />
        </div>
    );
}

import BeforeVote from '@/Pages/community/[boardId]/Components/Vote/BeforeVote/BeforeVote.tsx';
import AfterVote from '@/Pages/community/[boardId]/Components/Vote/AfterVote/AfterVote.tsx';
import { GoPeople } from 'react-icons/go';

export default function VoteSection() {
    const isMemberVoted = true;

    return (
        <div className={'flex flex-col gap-y-4 rounded-xl border border-slate-200 px-5 pb-1 pt-4'}>
            <div className={'flex justify-between px-1'}>
                <h3 className={'text-[0.9rem] font-extrabold'}>프로그래밍 언어 선택</h3>
                <div className={'flex items-center gap-x-2 text-slate-500'}>
                    <GoPeople className={'size-4'} />
                    <span className={'text-[0.75rem]'}>{300}명 참여</span>
                </div>
            </div>
            {isMemberVoted ? <AfterVote /> : <BeforeVote />}
        </div>
    );
}

import useChatRoomFilterStore from '@/Stores/useChatRoomFilterStore.ts';

export default function ChatRoomFilter() {
    const { chatRoomFilter, setChatRoomFilter } = useChatRoomFilterStore(state => state);

    return (
        <ul className={'flex gap-x-2 px-4 text-[0.75rem]'}>
            <li>
                <button
                    className={`px-3 py-1 text-[0.75rem] ${chatRoomFilter === 'oneOnOne' ? 'border-neutral-800 bg-neutral-800 text-white' : 'border-slate-200 bg-white text-neutral-800 hover:bg-slate-100'} rounded-3xl border font-bold transition-all`}
                    type={'button'}
                    onClick={() => {
                        setChatRoomFilter('oneOnOne');
                    }}
                >
                    1:1 채팅
                </button>
            </li>
            <li>
                <button
                    className={`px-3 py-1 text-[0.75rem] ${chatRoomFilter === 'skill' ? 'border-neutral-800 bg-neutral-800 text-white' : 'border-slate-200 bg-white text-neutral-800 hover:bg-slate-100'} rounded-3xl border font-bold transition-all`}
                    type={'button'}
                    onClick={() => {
                        setChatRoomFilter('skill');
                    }}
                >
                    기술별 채팅
                </button>
            </li>
        </ul>
    );
}

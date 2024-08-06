interface Props {
    currentFilter: string;
    updateChatRoomFilter(filter: string): void;
}

export default function ChatRoomFilter({ currentFilter, updateChatRoomFilter }: Props) {
    return (
        <ul className={'flex justify-end gap-x-2 px-4 text-[0.75rem]'}>
            <li
                className={`font-extrabold ${currentFilter === 'all' ? 'text-violet-700' : 'text-slate-400'} transition-all`}
            >
                <button
                    type={'button'}
                    onClick={() => {
                        updateChatRoomFilter('all');
                    }}
                >
                    • 전체
                </button>
            </li>
            <li
                className={`font-extrabold ${currentFilter === 'oneOnOne' ? 'text-violet-700' : 'text-slate-400'} transition-all`}
            >
                <button
                    type={'button'}
                    onClick={() => {
                        updateChatRoomFilter('oneOnOne');
                    }}
                >
                    • 1:1 채팅
                </button>
            </li>
            <li
                className={`font-extrabold ${currentFilter === 'skill' ? 'text-violet-700' : 'text-slate-400'} transition-all`}
            >
                <button
                    type={'button'}
                    onClick={() => {
                        updateChatRoomFilter('skill');
                    }}
                >
                    • 기술별 채팅
                </button>
            </li>
        </ul>
    );
}

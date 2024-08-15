interface Props {
    currentFilter: { value: string; label: string };
    updateNotificationFilter(filter: { value: string; label: string }): void;
}

export default function NotificationFilters({ currentFilter, updateNotificationFilter }: Props) {
    return (
        <ul className={'flex items-center gap-x-2 border-b border-slate-200 bg-white px-4 pb-2 text-[0.8rem]'}>
            {[
                { value: 'all', label: '전체' },
                { value: 'post', label: '게시글' },
                { value: 'comment', label: '댓글' },
                { value: 'follow', label: '팔로우' },
            ].map(filter => {
                return (
                    <li
                        className={`font-bold ${currentFilter.value === filter.value ? 'text-neutral-800' : 'text-slate-400'} transition-all`}
                    >
                        <button
                            type={'button'}
                            onClick={() => {
                                updateNotificationFilter(filter);
                            }}
                        >
                            • {filter.label}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

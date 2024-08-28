interface NotificationFilter {
    value: string;
    label: string;
}

interface Props {
    currentFilter: { value: string; label: string };
    onNotificationFilterButtonClick(filter: NotificationFilter): void;
}

const notificationFilters: NotificationFilter[] = [
    { value: 'all', label: '전체' },
    { value: 'post', label: '게시글' },
    { value: 'comment', label: '댓글' },
    { value: 'follow', label: '팔로우' },
];

export default function NotificationFilters({ currentFilter, onNotificationFilterButtonClick }: Props) {
    return (
        <ul className={'flex items-center gap-x-2 bg-white px-2'}>
            {notificationFilters.map(notificationFilter => (
                <li key={notificationFilter.value}>
                    <button
                        className={`px-3 py-1 text-[0.75rem] ${currentFilter.value === notificationFilter.value ? 'border-neutral-800 bg-neutral-800 text-white' : 'border-slate-200 bg-white text-black hover:bg-slate-100'} rounded-3xl border font-bold transition-all`}
                        onClick={() => {
                            onNotificationFilterButtonClick(notificationFilter);
                        }}
                        type={'button'}
                    >
                        {notificationFilter.label}
                    </button>
                </li>
            ))}
        </ul>
    );
}

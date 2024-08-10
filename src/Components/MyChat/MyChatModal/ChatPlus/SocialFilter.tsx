interface Props {
    currentFilter: string;
    updateSocialFilter(filter: string): void;
}

export default function SocialFilter({ currentFilter, updateSocialFilter }: Props) {
    return (
        <ul className={'flex justify-end gap-x-2 text-[0.75rem]'}>
            {['following', 'follower'].map(value => {
                return (
                    <li
                        className={`font-extrabold ${currentFilter === value ? 'text-violet-700' : 'text-slate-400'} transition-all`}
                    >
                        <button
                            type={'button'}
                            onClick={() => {
                                updateSocialFilter(value);
                            }}
                        >
                            • {value === 'following' ? '팔로잉' : '팔로워'}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

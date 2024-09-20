import { useSearchParams } from 'react-router-dom';

const socialFilters = [
    { value: 'following', label: '팔로잉' },
    { value: 'follower', label: '팔로워' },
];

const getCurrentSocialType = (searchParams: URLSearchParams): string => {
    const currentSocialType = searchParams.get('type');
    return socialFilters.some(filter => filter.value === currentSocialType) ? currentSocialType : 'following';
};

export default function SocialFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentSocialType = getCurrentSocialType(searchParams);

    const handleFilterButtonClick = (filterValue: string) => {
        searchParams.set('type', filterValue);
        searchParams.delete('search');
        setSearchParams(searchParams);
    };

    return (
        <ul className={'flex gap-x-2'}>
            {socialFilters.map(filter => (
                <li key={filter.value}>
                    <button
                        className={`px-3.5 py-1.5 text-[0.8rem] ${currentSocialType === filter.value ? 'border-neutral-800 bg-neutral-800 text-white' : 'border-slate-200 bg-white text-black hover:bg-slate-100'} rounded-3xl border font-bold transition-all`}
                        onClick={() => {
                            handleFilterButtonClick(filter.value);
                        }}
                        type={'button'}
                    >
                        {filter.label}
                    </button>
                </li>
            ))}
        </ul>
    );
}

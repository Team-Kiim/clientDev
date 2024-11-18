import { useSearchParams } from 'react-router-dom';
import getCurrentPostFilter from '@/Pages/user/posts/Utils/getCurrentPostFilter.tsx';

const activityFilters = [
    { value: 'write', label: '작성한' },
    { value: 'bookmark', label: '북마크 한' },
];

const postTypeFilters = [
    { value: 'qnas', label: 'QnA' },
    { value: 'community', label: '커뮤니티' },
];

export default function UserActivityFilter() {
    const [searchParams, setSearchParams] = useSearchParams();

    const { activity, postType } = getCurrentPostFilter(searchParams);

    const handleFilterButtonClick = (filterValue: string, filterType: string) => {
        searchParams.set(filterType, filterValue);
        setSearchParams(searchParams);
    };

    return (
        <ul className={'flex gap-x-2'}>
            {activityFilters.map(filter => {
                return (
                    <li key={filter.value}>
                        <button
                            className={`px-3.5 py-1.5 text-[0.8rem] ${activity === filter.value ? 'border-neutral-800 bg-neutral-800 text-white' : 'border-slate-200 bg-white text-black hover:bg-slate-100'} rounded-3xl border font-bold transition-all`}
                            onClick={() => {
                                handleFilterButtonClick(filter.value, 'activity');
                            }}
                            type={'button'}
                        >
                            {filter.label}
                        </button>
                    </li>
                );
            })}
            <div className={'divider divider-horizontal m-0'} />
            {postTypeFilters.map(filter => {
                return (
                    <li key={filter.value}>
                        <button
                            className={`px-3.5 py-1.5 text-[0.8rem] ${postType === filter.value ? 'border-neutral-800 bg-neutral-800 text-white' : 'border-slate-200 bg-white text-black hover:bg-slate-100'} rounded-3xl border font-bold transition-all`}
                            onClick={() => {
                                handleFilterButtonClick(filter.value, 'post-type');
                            }}
                        >
                            {filter.label}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

import { useSearchParams } from 'react-router-dom';
import getCurrentPostSortFilter from '@/Utils/getCurrentPostSortFilter.ts';

const postSortFilters = [
    { value: 'latest', label: '최신순' },
    { value: 'view', label: '조회순' },
    { value: 'like', label: '좋아요순' },
];

export default function PostSortFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPostSortFilterValue = getCurrentPostSortFilter(searchParams).value;

    const handleFilterButtonClick = (filterValue: string) => {
        searchParams.set('sort', filterValue);
        setSearchParams(searchParams);
    };

    return (
        <ul className={'flex gap-x-1 rounded-xl bg-slate-100 p-1'}>
            {postSortFilters.map(filter => (
                <li key={filter.value}>
                    <button
                        className={`inline-block px-3.5 py-1.5 text-[0.8rem] font-bold ${currentPostSortFilterValue === filter.value && 'bg-white text-slate-800 shadow'} rounded-lg`}
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

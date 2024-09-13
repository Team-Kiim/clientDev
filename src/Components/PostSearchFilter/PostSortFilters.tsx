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
        <ul className={'mx-2 flex gap-x-2.5'}>
            {postSortFilters.map(filter => (
                <li key={filter.value}>
                    <button
                        className={`text-sm font-bold ${currentPostSortFilterValue === filter.value ? 'inline-block bg-gradient-to-br from-[#6a3093] to-[#a044ff] bg-clip-text text-transparent' : 'text-slate-400 hover:text-slate-500'} transition-all`}
                        onClick={() => {
                            handleFilterButtonClick(filter.value);
                        }}
                        type={'button'}
                    >
                        • {filter.label}
                    </button>
                </li>
            ))}
        </ul>
    );
}

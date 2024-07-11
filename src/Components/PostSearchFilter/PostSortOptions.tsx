import { useSearchParams } from 'react-router-dom';

export default function PostSortOptions() {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentSortOption = searchParams.get('sort') ?? 'latest';
    const handleSortOptionButtonClick = (targetOption: string) => {
        searchParams.set('sort', targetOption);
        setSearchParams(searchParams);
    };

    return (
        <div>
            <ul className={'flex gap-x-2 text-[0.85rem]'}>
                <li>
                    <button
                        className={`${currentSortOption === 'latest' ? 'font-extrabold text-violet-700' : 'font-bold text-slate-400 hover:text-slate-500'} transition-all`}
                        onClick={() => {
                            handleSortOptionButtonClick('latest');
                        }}
                    >
                        • 최신순
                    </button>
                </li>
                <li>
                    <button
                        className={`${currentSortOption === 'view' ? 'font-extrabold text-violet-700' : 'font-bold text-slate-400 hover:text-slate-500'} transition-all`}
                        onClick={() => {
                            handleSortOptionButtonClick('view');
                        }}
                    >
                        • 조회순
                    </button>
                </li>
                <li>
                    <button
                        className={`${currentSortOption === 'like' ? 'font-extrabold text-violet-700' : 'font-bold text-slate-400 hover:text-slate-500'} transition-all`}
                        onClick={() => {
                            handleSortOptionButtonClick('like');
                        }}
                    >
                        • 좋아요순
                    </button>
                </li>
            </ul>
        </div>
    );
}

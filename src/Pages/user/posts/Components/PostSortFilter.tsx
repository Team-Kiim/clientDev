import { useSearchParams } from 'react-router-dom';
import { ChangeEventHandler } from 'react';

export default function PostSortFilter() {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPostSortFilter = searchParams.get('post-sort') ?? 'latest';

    const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = event => {
        const postSortFilter = event.target.value;
        searchParams.set('post-sort', postSortFilter);
        setSearchParams(searchParams);
    };

    return (
        <select className={'select select-sm w-44 font-bold'} onChange={handleSelectChange}>
            <option value={'latest'} selected={currentPostSortFilter === 'latest'}>
                최신순
            </option>
            <option value={'view'} selected={currentPostSortFilter === 'view'}>
                조회순
            </option>
            <option value={'like'} selected={currentPostSortFilter === 'like'}>
                좋아요순
            </option>
        </select>
    );
}

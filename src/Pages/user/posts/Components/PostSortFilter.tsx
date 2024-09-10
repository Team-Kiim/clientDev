import { useSearchParams } from 'react-router-dom';
import { ChangeEventHandler } from 'react';
import getCurrentPostFilter from '@/Pages/user/posts/Utils/getCurrentPostFilter.tsx';

export default function PostSortFilter() {
    const [searchParams, setSearchParams] = useSearchParams();

    const { postSort } = getCurrentPostFilter(searchParams);

    const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = event => {
        const postSortFilter = event.target.value;
        searchParams.set('post-sort', postSortFilter);
        setSearchParams(searchParams);
    };

    return (
        <select className={'select select-sm w-44 font-bold'} onChange={handleSelectChange}>
            <option value={'latest'} selected={postSort === 'latest'}>
                최신순
            </option>
            <option value={'view'} selected={postSort === 'view'}>
                조회순
            </option>
            <option value={'like'} selected={postSort === 'like'}>
                좋아요순
            </option>
        </select>
    );
}

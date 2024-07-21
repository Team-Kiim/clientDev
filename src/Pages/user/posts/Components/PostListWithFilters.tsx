import { useState } from 'react';
import PostFilters from '@/Pages/user/posts/Components/PostFilters.tsx';
import PostListItem from '@/Pages/user/posts/Components/PostListItem.tsx';

export default function PostListWithFilters() {
    const [selectedPostFilter, setSelectedPostFilter] = useState('작성한 게시글');

    const [selectedPostType, setSelectedPostType] = useState('QnA');

    const updateSelectedPostFilter = (postFilter: string) => {
        setSelectedPostFilter(postFilter);
    };

    const updateSelectedPostType = (postType: string) => {
        setSelectedPostType(postType);
    };

    return (
        <div className={'flex flex-col gap-y-3'}>
            <PostFilters
                selectedPostFilter={selectedPostFilter}
                updateSelectedPostFilter={updateSelectedPostFilter}
                selectedPostType={selectedPostType}
                updateSelectedPostType={updateSelectedPostType}
            />
            <ul className={'h-[27rem] overflow-y-auto overscroll-y-contain rounded-lg border border-slate-200'}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(e => {
                    return <PostListItem key={e} />;
                })}
            </ul>
        </div>
    );
}

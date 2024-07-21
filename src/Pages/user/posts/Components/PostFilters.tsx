interface Props {
    selectedPostFilter: string;
    updateSelectedPostFilter(postFilter: string): void;
    selectedPostType: string;
    updateSelectedPostType(postType: string): void;
}

export default function PostFilters({
    selectedPostFilter,
    updateSelectedPostFilter,
    selectedPostType,
    updateSelectedPostType,
}: Props) {
    const postFilters = ['작성한 게시글', '좋아요 한 게시글', '북마크 한 게시글', '댓글 단 게시글'];
    const postTypes = ['QnA', '커뮤니티'];

    console.log(selectedPostType);

    return (
        <div className={'flex items-center justify-between'}>
            <ul className={'flex gap-x-5'}>
                {postFilters.map(postFilter => {
                    return (
                        <li key={postFilter}>
                            <button
                                className={`${postFilter === selectedPostFilter ? 'underline decoration-violet-700 decoration-2 underline-offset-8' : 'text-slate-400 hover:text-slate-600'} text-[0.9rem] font-bold transition-all`}
                                type={'button'}
                                onClick={() => {
                                    updateSelectedPostFilter(postFilter);
                                }}
                            >
                                {postFilter}
                            </button>
                        </li>
                    );
                })}
            </ul>
            <ul className={'flex gap-x-2.5'}>
                {postTypes.map(postType => {
                    return (
                        <li key={postType}>
                            <button
                                className={`${postType === selectedPostType ? 'text-violet-700' : 'text-slate-400 hover:text-slate-600'} text-[0.85rem] font-extrabold transition-all`}
                                type={'button'}
                                onClick={() => {
                                    updateSelectedPostType(postType);
                                }}
                            >
                                • {postType}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

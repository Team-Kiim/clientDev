const getCurrentPostFilter = (searchParams: URLSearchParams) => {
    const activityFilterList = [
        { value: 'write', label: '작성한' },
        { value: 'like', label: '좋아요 한' },
        { value: 'bookmark', label: '북마크 한' },
        { value: 'comment', label: '댓글 단' },
    ];

    const postTypeList = ['qnas', 'community'];

    const postSortList = ['latest', 'view', 'like'];

    const activityFilterValue = searchParams.get('activity');

    const postType = searchParams.get('post-type');

    const postSort = searchParams.get('post-sort');

    return {
        activity: activityFilterList.some(filter => filter.value === activityFilterValue)
            ? activityFilterValue
            : 'write',
        postType: postTypeList.some(value => value === postType) ? postType : 'qnas',
        postSort: postSortList.some(value => value === postSort) ? postSort : 'latest',
    };
};

export default getCurrentPostFilter;

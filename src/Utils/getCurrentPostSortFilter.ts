interface Filter {
    value: string;
    label: string;
}

const getCurrentPostSortFilter = (searchParams: URLSearchParams): Filter => {
    const postSortFilters: Filter[] = [
        { value: 'latest', label: '최신순' },
        { value: 'view', label: '조회순' },
        { value: 'like', label: '좋아요순' },
    ];

    const postSortFilterValue = searchParams.get('sort');

    return postSortFilters.some(filter => filter.value === postSortFilterValue)
        ? postSortFilters.find(filter => filter.value === postSortFilterValue)
        : postSortFilters[0];
};

export default getCurrentPostSortFilter;

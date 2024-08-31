export const getCurrentSocialType = (searchParams: URLSearchParams): string => {
    const socialFilters = [
        { value: 'following', label: '팔로잉' },
        { value: 'follower', label: '팔로워' },
    ];

    const currentSocialType = searchParams.get('type');
    return socialFilters.some(filter => filter.value === currentSocialType) ? currentSocialType : 'following';
};

import FollowingListItem from '@/Pages/user/social/Components/Following/FollowingListItem.tsx';

export default function FollowingList() {
    const handleUnfollowButtonClick = () => {
        console.log('follow cancel');
    };

    return (
        <ul className={'flex h-96 flex-col overflow-y-auto overscroll-y-contain'}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(e => {
                return <FollowingListItem key={e} onUnfollowButtonClick={handleUnfollowButtonClick} />;
            })}
        </ul>
    );
}

import FollowerListItem from '@/Pages/user/social/Components/Follower/FollowerListItem.tsx';

export default function FollowerList() {
    return (
        <ul className={'flex h-96 flex-col overflow-y-auto overscroll-y-contain'}>
            {[...Array(10).keys()].map(e => {
                return <FollowerListItem key={e} />;
            })}
        </ul>
    );
}

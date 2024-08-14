import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import FollowingListItem from '@/Pages/user/social/Components/Following/FollowingListItem.tsx';
import getSocialMediaUserList from '@/Utils/getSocialMediaUserList.ts';

export default function FollowingList() {
    const navigate = useNavigate();

    const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery({
        queryKey: ['social', 'following'],
        queryFn: getSocialMediaUserList,
        initialPageParam: 0,
        getNextPageParam(lastPage, allPages) {
            if (lastPage.length < 16) {
                return undefined;
            }
            return allPages.length;
        },
    });

    const followingList = data.pages.flat();

    const handleFollowingListItemClick = (memberId: number) => {
        navigate(`/user/${memberId}`);
    };

    const handleUnfollowButtonClick = () => {
        console.log('follow cancel');
    };

    return (
        <div className={'flex h-full flex-col'}>
            <div className={'flex items-center justify-end'}>
                <span className={'p-3 text-[0.8rem] font-extrabold text-slate-500'}>
                    팔로잉 수 : {followingList.length}
                </span>
            </div>
            <div className={'relative shrink-0 flex-grow basis-0 overflow-y-auto'}>
                {followingList.length === 0 ? (
                    <div className={'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center'}>
                        <span className={'text-[0.85rem] font-bold text-slate-500'}>
                            아직 팔로잉한 사용자가 없어요.
                        </span>
                    </div>
                ) : (
                    <ul id={'followingList'} className={'flex h-full flex-col overflow-y-auto overscroll-y-contain'}>
                        <InfiniteScroll
                            next={fetchNextPage}
                            hasMore={hasNextPage}
                            loader={null}
                            dataLength={followingList.length}
                            scrollableTarget={'followingList'}
                            scrollThreshold={0.9}
                        >
                            {followingList.map(followingListItem => {
                                return (
                                    <FollowingListItem
                                        socialMediaUser={followingListItem}
                                        onFollowingListItemClick={handleFollowingListItemClick}
                                        onUnfollowButtonClick={handleUnfollowButtonClick}
                                    />
                                );
                            })}
                        </InfiniteScroll>
                    </ul>
                )}
            </div>
        </div>
    );
}

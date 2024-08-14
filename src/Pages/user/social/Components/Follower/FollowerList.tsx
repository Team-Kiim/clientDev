import { useNavigate } from 'react-router-dom';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import FollowerListItem from '@/Pages/user/social/Components/Follower/FollowerListItem.tsx';
import getSocialMediaUserList from '@/Utils/getSocialMediaUserList.ts';

export default function FollowerList() {
    const navigate = useNavigate();

    const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery({
        queryKey: ['social', 'follower'],
        queryFn: getSocialMediaUserList,
        initialPageParam: 0,
        getNextPageParam(lastPage, allPages) {
            if (lastPage.length < 16) {
                return undefined;
            }
            return allPages.length;
        },
    });

    const followerList = data.pages.flat();

    const handleFollowerListItemClick = (memberId: number) => {
        navigate(`/user/${memberId}`);
    };

    return (
        <div className={'flex h-full flex-col'}>
            <div className={'flex items-center justify-end'}>
                <span className={'p-3 text-[0.8rem] font-extrabold text-slate-500'}>
                    팔로워 수 : {followerList.length}
                </span>
            </div>
            <div className={'relative shrink-0 flex-grow basis-0 overflow-y-auto'}>
                {followerList.length === 0 ? (
                    <div className={'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center'}>
                        <span className={'text-[0.85rem] font-bold text-slate-500'}>
                            아직 나를 팔로우하는 사용자가 없어요.
                        </span>
                    </div>
                ) : (
                    <ul id={'followerList'} className={'flex h-full flex-col overflow-y-auto overscroll-y-contain'}>
                        <InfiniteScroll
                            next={fetchNextPage}
                            hasMore={hasNextPage}
                            loader={null}
                            dataLength={followerList.length}
                            scrollableTarget={'followerList'}
                            scrollThreshold={0.9}
                        >
                            {followerList.map(followerListItem => {
                                return (
                                    <FollowerListItem
                                        socialMediaUser={followerListItem}
                                        onFollowerListItemClick={handleFollowerListItemClick}
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

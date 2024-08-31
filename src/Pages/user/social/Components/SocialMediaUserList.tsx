import { useSearchParams } from 'react-router-dom';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useUnfollowMember } from '@/Pages/user/social/Hooks/useUnfollowMember.tsx';
import SocialMediaUserListItem from '@/Pages/user/social/Components/SocialMediaUserListItem.tsx';
import getSocialMediaUserList from '@/Utils/getSocialMediaUserList.ts';
import { getCurrentSocialType } from '@/Pages/user/social/Utils/getCurrentSocialType.ts';

export default function SocialMediaUserList() {
    const [searchParams] = useSearchParams();

    const currentSocialType = getCurrentSocialType(searchParams);

    const userNicknameToSearch = searchParams.get('search');

    const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery({
        queryKey: ['social', currentSocialType],
        queryFn: getSocialMediaUserList,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < 16) {
                return undefined;
            }
            return allPages.length;
        },
    });

    const socialMediaUserList = data.pages.flat();

    const { mutate: unfollowMember } = useUnfollowMember();

    const handleUnFollowButtonClick = (memberId: number) => {
        unfollowMember(memberId);
    };

    return (
        <div className={'flex flex-col gap-y-3'}>
            <div className={'flex items-center'}>
                <span className={'text-[0.8rem] font-bold text-slate-500'}>
                    {currentSocialType === 'following' ? '팔로잉 수' : '팔로워 수'} : {socialMediaUserList.length}
                </span>
            </div>
            <div>
                {socialMediaUserList.length !== 0 ? (
                    <InfiniteScroll
                        next={fetchNextPage}
                        hasMore={hasNextPage}
                        loader={null}
                        dataLength={socialMediaUserList.length}
                        scrollThreshold={0.9}
                        className={'pt-3'}
                    >
                        <ul className={'flex flex-col'}>
                            {currentSocialType === 'following'
                                ? socialMediaUserList.map(socialMediaUser => (
                                      <SocialMediaUserListItem
                                          key={socialMediaUser.memberId}
                                          socialMediaUser={socialMediaUser}
                                          onUnfollowButtonClick={handleUnFollowButtonClick}
                                      />
                                  ))
                                : socialMediaUserList.map(socialMediaUser => (
                                      <SocialMediaUserListItem
                                          key={socialMediaUser.memberId}
                                          socialMediaUser={socialMediaUser}
                                      />
                                  ))}
                        </ul>
                    </InfiniteScroll>
                ) : (
                    <p className={'my-10 text-center text-sm text-slate-400'}>
                        {currentSocialType === 'following'
                            ? '아직 팔로우한 사용자가 없어요'
                            : '아직 나를 팔로우 하는 사용자가 없어요.'}
                    </p>
                )}
            </div>
        </div>
    );
}

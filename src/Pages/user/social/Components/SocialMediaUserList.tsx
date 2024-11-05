import { useParams, useSearchParams, useOutletContext } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useUnfollowMember } from '@/Pages/user/social/Hooks/useUnfollowMember.tsx';
import SocialMediaUserListItem from '@/Pages/user/social/Components/SocialMediaUserListItem.tsx';
import useSocialMediaUserListQuery from '@/Pages/user/social/Hooks/useSocialMediaUserListQuery.ts';
import { getCurrentSocialType } from '@/Pages/user/social/Utils/getCurrentSocialType.ts';
import type { User } from '@/Types/User.ts';

interface UserDataContext {
    userData: User;
}

export default function SocialMediaUserList() {
    const [searchParams] = useSearchParams();

    const { profileMemberId } = useParams();

    const currentSocialType = getCurrentSocialType(searchParams);

    const { userData } = useOutletContext<UserDataContext>();

    const userNicknameToSearch = searchParams.get('search');

    const { data, fetchNextPage, hasNextPage } = useSocialMediaUserListQuery({
        relationshipType: currentSocialType === 'following' ? 'followings' : 'followers',
        memberId: profileMemberId ? Number(profileMemberId) : null,
        keyword: userNicknameToSearch ?? null,
    });

    const { mutate: unfollowMember } = useUnfollowMember({
        relationshipType: currentSocialType === 'following' ? 'followings' : 'followers',
        keyword: userNicknameToSearch,
    });

    const handleUnFollowButtonClick = (memberId: string) => {
        unfollowMember(memberId);
    };

    const socialMediaUserList = data.pages.flat();

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
                                          loginMember={userData.isLoginMember}
                                          socialMediaUser={socialMediaUser}
                                          onUnfollowButtonClick={handleUnFollowButtonClick}
                                      />
                                  ))
                                : socialMediaUserList.map(socialMediaUser => (
                                      <SocialMediaUserListItem
                                          key={socialMediaUser.memberId}
                                          socialMediaUser={socialMediaUser}
                                          onUnfollowButtonClick={handleUnFollowButtonClick}
                                      />
                                  ))}
                        </ul>
                    </InfiniteScroll>
                ) : (
                    <p className={'my-10 text-center text-sm text-slate-400'}>
                        {currentSocialType === 'following'
                            ? '아직 팔로우한 사용자가 없어요'
                            : '아직 팔로우 하는 사용자가 없어요.'}
                    </p>
                )}
            </div>
        </div>
    );
}

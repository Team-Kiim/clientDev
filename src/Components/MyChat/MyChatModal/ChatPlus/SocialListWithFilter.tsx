import axios from 'axios';
import Swal from 'sweetalert2';
import { useState } from 'react';
import NickNameSearchInput from '@/Components/MyChat/MyChatModal/ChatPlus/NickNameSearchInput.tsx';
import SocialFilter from '@/Components/MyChat/MyChatModal/ChatPlus/SocialFilter.tsx';
import SocialListItem from '@/Components/MyChat/MyChatModal/ChatPlus/SocialListItem.tsx';
import fetchSocialMediaUserList from '@/Pages/user/social/Utils/fetchSocialMediaUserList.ts';
import { useQueryClient, useSuspenseInfiniteQuery } from '@tanstack/react-query';

interface Props {
    updateCurrentViewName(viewName: string): void;
}

export default function SocialListWithFilter({ updateCurrentViewName }: Props) {
    const queryClient = useQueryClient();

    const [currentFilter, setCurrentFilter] = useState('following');
    const [nickNameToSearch, setNickNameToSearch] = useState('');

    const { data } = useSuspenseInfiniteQuery({
        queryKey: [
            'user',
            'social',
            {
                relationshipType: currentFilter === 'following' ? 'followings' : 'followers',
                keyword: nickNameToSearch,
                memberId: null,
            },
        ],
        queryFn: fetchSocialMediaUserList,
        initialPageParam: 0,
        getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.length < 16 ? undefined : lastPageParam + 1),
    });

    const socialList = data.pages.flat();

    const updateNickNameToSearch = (nickName: string) => {
        setNickNameToSearch(nickName);
    };

    const updateSocialFilter = (filter: string) => {
        setCurrentFilter(filter);
    };

    const handleChatButtonClick = async (memberId: string, otherUserNickname: string) => {
        try {
            const { chatRoomId } = await axios
                .post('/api/direct-chat-room/', {
                    memberId,
                })
                .then(response => response.data);
            queryClient.invalidateQueries({
                queryKey: ['user', 'chatRoomList'],
                refetchType: 'all',
            });
            updateCurrentViewName(
                `chatRoom:${chatRoomId} oppositeMemberId:${memberId} otherUserName:${otherUserNickname}`,
            );
        } catch (error) {
            Swal.fire({
                target: '.myChatModal',
                html: '<p class="leading-4 text-slate-500 text-[0.75rem]">현재 채팅을 할 수 없습니다.<br/> 잠시 후 다시 시도해주세요.</p>',
                showCancelButton: false,
                confirmButtonText: '확인',
                customClass: {
                    popup: 'w-[240px] text-[0.75rem] py-3',
                    container: 'rounded-3xl absolute',
                    confirmButton: 'text-[0.8rem] bg-plump-purple-600 rounded-xl',
                },
            });
        }
    };

    return (
        <div className={'flex flex-1 shrink-0 flex-grow flex-col gap-y-3 overflow-y-auto'}>
            <div className={'flex items-center gap-x-2 px-4'}>
                <NickNameSearchInput updateNickNameToSearch={updateNickNameToSearch} />
                <SocialFilter currentFilter={currentFilter} updateSocialFilter={updateSocialFilter} />
            </div>
            {socialList.length !== 0 ? (
                <ul className={'flex flex-1 shrink-0 flex-grow flex-col overflow-y-auto overscroll-y-contain'}>
                    {socialList.map(socialListItem => {
                        return (
                            <SocialListItem
                                key={socialListItem.memberId}
                                socialInfo={socialListItem}
                                onChatButtonClick={handleChatButtonClick}
                            />
                        );
                    })}
                </ul>
            ) : (
                <div className={'flex min-h-0 flex-1 items-center justify-center'}>
                    <p className={'my-10 text-center text-[0.8rem] text-slate-400'}>
                        {currentFilter === 'following'
                            ? '아직 팔로우한 사용자가 없어요'
                            : '아직 팔로우 하는 사용자가 없어요.'}
                    </p>
                </div>
            )}
        </div>
    );
}

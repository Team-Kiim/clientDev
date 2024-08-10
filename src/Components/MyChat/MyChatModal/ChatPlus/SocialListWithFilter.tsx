import { useState } from 'react';
import NickNameSearchInput from '@/Components/MyChat/MyChatModal/ChatPlus/NickNameSearchInput.tsx';
import SocialFilter from '@/Components/MyChat/MyChatModal/ChatPlus/SocialFilter.tsx';
import SocialListItem from '@/Components/MyChat/MyChatModal/ChatPlus/SocialListItem.tsx';

interface Props {
    updateCurrentViewName(viewName: string): void;
}

export default function SocialListWithFilter({ updateCurrentViewName }: Props) {
    const [currentFilter, setCurrentFilter] = useState('following');
    const [nickNameToSearch, setNickNameToSearch] = useState('');

    const updateNickNameToSearch = (nickName: string) => {
        setNickNameToSearch(nickName);
    };

    const updateSocialFilter = (filter: string) => {
        setCurrentFilter(filter);
    };

    const handleChatButtonClick = () => {
        // 채팅방 만듬 -> 응답받은 아이디 가지고 채팅방 들어감
        updateCurrentViewName('chatRoom20');
    };

    return (
        <div className={'flex flex-1 shrink-0 flex-grow flex-col gap-y-3 overflow-y-auto'}>
            <div className={'flex items-center gap-x-2 px-4'}>
                <NickNameSearchInput updateNickNameToSearch={updateNickNameToSearch} />
                <SocialFilter currentFilter={currentFilter} updateSocialFilter={updateSocialFilter} />
            </div>
            <div className={'flex flex-1 shrink-0 flex-grow flex-col overflow-y-auto overscroll-y-contain'}>
                {Array.from(Array(10).keys()).map(element => {
                    return <SocialListItem key={element} onChatButtonClick={handleChatButtonClick} />;
                })}
            </div>
        </div>
    );
}

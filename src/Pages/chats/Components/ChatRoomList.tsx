import { useSuspenseQuery } from '@tanstack/react-query';
import ChatRoomListItem from '@/Pages/chats/Components/ChatRoomListItem.tsx';
import fetchSkillChatRoomList from '@/Pages/chats/Utils/fetchSkillChatRoomList.ts';
import { CATEGORIES } from '@/Constants/categories.ts';

interface Props {
    currentParentSkillCategory: string;
}

export default function ChatRoomList({ currentParentSkillCategory }: Props) {
    const { data } = useSuspenseQuery({
        queryKey: ['chatRoomList', 'skill', { category: currentParentSkillCategory }],
        queryFn: fetchSkillChatRoomList,
    });

    return (
        <ul className={'grid grid-cols-2 gap-x-3 gap-y-5'}>
            {data.map(skillChatRoom => (
                <ChatRoomListItem
                    key={skillChatRoom.chatRoomId}
                    chatRoomId={skillChatRoom.chatRoomId}
                    parentSkillCategory={
                        CATEGORIES.find(category => category.value === skillChatRoom.parentSkillCategory).label
                    }
                    childSkillCategory={
                        CATEGORIES.find(
                            category => category.value === skillChatRoom.parentSkillCategory,
                        ).childCategories.find(category => category.value === skillChatRoom.childSkillCategory).label
                    }
                    currentMemberSize={skillChatRoom.currentMemberSize}
                />
            ))}
        </ul>
    );
}

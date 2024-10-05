import ChatRoomListItem from '@/Pages/chats/Components/ChatRoomListItem.tsx';
import { CATEGORIES } from '@/Constants/categories.ts';

interface Props {
    currentParentSkillCategory: string;
}

export default function ChatRoomList({ currentParentSkillCategory }: Props) {
    const childCategoryList = CATEGORIES.find(
        category => category.value === currentParentSkillCategory,
    ).childCategories;

    console.log(childCategoryList);

    return (
        <ul className={'flex flex-col'}>
            {Array.from(Array(5).keys()).map(e => (
                <ChatRoomListItem key={e} />
            ))}
        </ul>
    );
}

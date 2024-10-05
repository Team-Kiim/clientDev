import { Suspense } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import SearchChatRoomInput from '@/Pages/chats/Components/SearchChatRoomInput.tsx';
import ChatCategoryList from '@/Pages/chats/Components/ChatCategoryList.tsx';
import ChatRoomList from '@/Pages/chats/Components/ChatRoomList.tsx';
import { CATEGORIES } from '@/Constants/categories.ts';

export default function Page() {
    const { skillCategory } = useParams();

    const parentCategoryList = CATEGORIES.map(category => category.value);

    if (skillCategory && !parentCategoryList.some(parentCategory => parentCategory === skillCategory)) {
        return <Navigate to={'/chats/PROGRAMMING_LANGUAGE'} replace={true} />;
    }

    return (
        <div className={'mt-8 flex w-full min-w-[1500px] justify-center'}>
            <div className={'flex w-[55rem] gap-x-4'}>
                <div className={'sticky top-[calc(2rem+4.5rem)] flex w-3/12 flex-shrink-0 flex-col gap-y-5 self-start'}>
                    <SearchChatRoomInput />
                    <ChatCategoryList currentParentSkillCategory={skillCategory ?? 'PROGRAMMING_LANGUAGE'} />
                </div>
                <div className={'w-9/12'}>
                    <Suspense>
                        <ChatRoomList currentParentSkillCategory={skillCategory ?? 'PROGRAMMING_LANGUAGE'} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

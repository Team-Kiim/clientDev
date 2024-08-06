import { useState } from 'react';
import MyChatModalTop from '@/Components/MyChat/MyChatModal/MyChatModalTop.tsx';
import HomeView from '@/Components/MyChat/MyChatModal/Home/HomeView.tsx';
import ChatSearchView from '@/Components/MyChat/MyChatModal/ChatSearch/ChatSearchView.tsx';

export default function MyChatModal() {
    const [currentViewName, setCurrentViewName] = useState('home');

    const updateCurrentViewName = (viewName: string) => {
        setCurrentViewName(viewName);
    };

    return (
        <div
            className={
                'absolute bottom-20 right-0 z-50 flex h-[38rem] w-[23rem] flex-col gap-y-7 rounded-[2.5rem] bg-white py-5 shadow-2xl'
            }
        >
            <MyChatModalTop currentViewName={currentViewName} updateCurrentViewName={updateCurrentViewName} />
            {
                {
                    home: <HomeView />,
                    chatSearch: <ChatSearchView />,
                }[currentViewName]
            }
        </div>
    );
}

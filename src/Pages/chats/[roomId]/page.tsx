import { Suspense } from 'react';
import PostViewChatVer from '@/Pages/chats/[roomId]/Components/PostViewChatVer/PostViewChatVer.tsx';
import ChatView from '@/Pages/chats/[roomId]/Components/ChatSection/ChatView.tsx';

export default function Page() {
    return (
        <div className={'flex w-full min-w-[1500px] justify-center'}>
            <div className={'grid h-[calc(100vh-5rem)] w-[90rem] grid-cols-10 gap-x-8'}>
                <Suspense>
                    <PostViewChatVer />
                </Suspense>
                <Suspense>
                    <ChatView />
                </Suspense>
            </div>
        </div>
    );
}

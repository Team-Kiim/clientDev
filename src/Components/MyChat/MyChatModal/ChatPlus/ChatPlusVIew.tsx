import { Suspense } from 'react';
import SocialListWithFilter from '@/Components/MyChat/MyChatModal/ChatPlus/SocialListWithFilter.tsx';

interface Props {
    updateCurrentViewName(viewName: string): void;
}

export default function ChatPlusVIew({ updateCurrentViewName }: Props) {
    return (
        <>
            <Suspense>
                <SocialListWithFilter updateCurrentViewName={updateCurrentViewName} />
            </Suspense>
        </>
    );
}

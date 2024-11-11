import { useState } from 'react';
import ChatBubbleListItem from '@/Pages/chats/[chatRoomId]/Components/ChatRoom/ChatBubbleListItem.tsx';
import ImageChatBubbleListItem from '@/Pages/chats/[chatRoomId]/Components/ChatRoom/ImageChatBubbleListItem.tsx';
import ImageViewerModal from '@/Components/ChatRelated/ImageViewer/ImageViewerModal.tsx';
import { type Chat } from '@/Types/chat.ts';

interface Props {
    chatList: Chat[];
}

interface Props {
    chatList: Chat[];
    memberId: string;
}

export default function ChatBubbleList({ chatList, memberId }: Props) {
    const [isImageViewerModalOpen, setIsImageViewerModalOpen] = useState(false);

    const [imageSrcListToView, setImageSrcListToView] = useState([]);

    // const [isCodeViewerModalOpen, setIsCodeViewerModalOpen] = useState(false);
    //
    // const [sourceCodeInfo, setSourceCodeInfo] = useState<{
    //     sourceCode: string;
    //     language: string;
    //     codeDescription: string;
    // }>(null);

    const handleImageClick = (imageSrcList: string[]) => {
        setIsImageViewerModalOpen(true);
        setImageSrcListToView(imageSrcList);
    };

    return (
        <>
            <ul className={'flex flex-col-reverse gap-y-2 overflow-y-auto p-2 '}>
                {chatList.map(chat => {
                    if (chat.messageType === 'IMAGE') {
                        return (
                            <ImageChatBubbleListItem
                                key={chat.messageId}
                                chatData={chat}
                                onImageClick={handleImageClick}
                                memberId={memberId}
                            />
                        );
                    }
                    return <ChatBubbleListItem key={chat.messageId} chatData={chat} memberId={memberId} />;
                })}
            </ul>
            <ImageViewerModal
                isImageViewerModalOpen={isImageViewerModalOpen}
                closeImageViewerModal={() => {
                    setIsImageViewerModalOpen(false);
                }}
                indexOfImageClicked={0}
                imageSrcListToView={imageSrcListToView}
            />
        </>
    );
}

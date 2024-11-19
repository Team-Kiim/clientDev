import { useState } from 'react';
import ChatBubbleListItem from '@/Components/MyChat/MyChatModal/ChatRoom/ChatBubbleListItem.tsx';
import ImageChatBubbleListItem from '@/Components/MyChat/MyChatModal/ChatRoom/ImageChatBubbleListItem.tsx';
// import CodeChatBubbleListItem from '@/Components/MyChat/MyChatModal/ChatRoom/CodeChatBubbleListItem.tsx';
import ImageViewerModal from '@/Components/ChatRelated/ImageViewer/ImageViewerModal.tsx';
// import CodeViewerModal from '@/Components/ChatRelated/CodeViewer/CodeViewerModal.tsx';
import type { Chat } from '@/Types/chat.ts';

interface Props {
    chatList: Chat[];
    memberId?: string;
    oppositeMemberId?: string;
}

export default function ChatBubbleList({ chatList, memberId, oppositeMemberId }: Props) {
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

    // const handleSourceCodeChatBubbleListClick = ({
    //     sourceCode,
    //     language,
    //     codeDescription,
    // }: {
    //     sourceCode: string;
    //     language: string;
    //     codeDescription: string;
    // }) => {
    //     setSourceCodeInfo({
    //         sourceCode,
    //         language,
    //         codeDescription,
    //     });
    //     setIsCodeViewerModalOpen(true);
    // };

    return (
        <>
            <ul className={'chatBubbleList flex min-h-0 flex-1 flex-col-reverse gap-y-2 overflow-y-auto p-2'}>
                {chatList.map(chat => {
                    if (chat.messageType === 'IMAGE') {
                        return (
                            <ImageChatBubbleListItem
                                key={chat.messageId}
                                chatData={chat}
                                memberId={memberId}
                                onImageClick={handleImageClick}
                            />
                        );
                    }

                    return (
                        <ChatBubbleListItem
                            key={chat.messageId}
                            chatData={chat}
                            memberId={memberId}
                            oppositeMemberId={oppositeMemberId}
                        />
                    );
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
            {/*<CodeViewerModal*/}
            {/*    isCodeViewerModalOpen={isCodeViewerModalOpen}*/}
            {/*    closeCodeViewerModal={() => {*/}
            {/*        setIsCodeViewerModalOpen(false);*/}
            {/*    }}*/}
            {/*    {...sourceCodeInfo}*/}
            {/*/>*/}
        </>
    );
}

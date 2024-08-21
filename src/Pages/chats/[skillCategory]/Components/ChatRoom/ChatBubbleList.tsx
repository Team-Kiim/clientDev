import { faker } from '@faker-js/faker';
import { useEffect, useRef, useState } from 'react';
import ChatBubbleListItem from '@/Pages/chats/[skillCategory]/Components/ChatRoom/ChatBubbleListItem.tsx';
import ImageChatBubbleListItem from '@/Pages/chats/[skillCategory]/Components/ChatRoom/ImageChatBubbleListItem.tsx';
import ImageViewerModal from '@/Components/ChatRelated/ImageViewer/ImageViewerModal.tsx';

export default function ChatBubbleList() {
    const chatBubbleListRef = useRef<HTMLUListElement>(null);

    const [isImageViewerModalOpen, setIsImageViewerModalOpen] = useState(false);

    const [indexOfImageClicked, setIndexOfImageClicked] = useState(-1);

    const [imageSrcListToView, setImageSrcListToView] = useState<string[]>([]);

    const handleImageClick = (indexOfClickedImage: number, imageSrcList: string[]) => {
        setIsImageViewerModalOpen(true);
        setIndexOfImageClicked(indexOfClickedImage);
        setImageSrcListToView(imageSrcList);
    };

    useEffect(() => {
        chatBubbleListRef.current.scrollTop = chatBubbleListRef.current.scrollHeight;
    }, []);

    return (
        <>
            <ul
                className={
                    'flex shrink-0 flex-grow basis-0 flex-col gap-y-3 overflow-y-auto overscroll-y-contain px-3 pb-4 pt-20 scrollbar-hide'
                }
                ref={chatBubbleListRef}
            >
                <ChatBubbleListItem memberSent={true} messageType={''} />
                <ChatBubbleListItem memberSent={false} messageType={''} />
                <ChatBubbleListItem memberSent={true} messageType={''} />
                <ChatBubbleListItem memberSent={true} messageType={''} />
                <ChatBubbleListItem memberSent={false} messageType={''} />
                <ChatBubbleListItem memberSent={false} messageType={''} />
                <ChatBubbleListItem memberSent={true} messageType={''} />
                <ChatBubbleListItem messageType={'ENTER'} />
                <ChatBubbleListItem memberSent={false} messageType={''} />
                <ChatBubbleListItem memberSent={true} messageType={''} />
                <ChatBubbleListItem memberSent={true} messageType={''} />
                <ImageChatBubbleListItem
                    memberSent={true}
                    imageSrcList={[faker.image.urlPicsumPhotos(), faker.image.urlPicsumPhotos()]}
                    onImageClick={handleImageClick}
                />
                <ImageChatBubbleListItem
                    memberSent={false}
                    imageSrcList={[faker.image.urlPicsumPhotos()]}
                    onImageClick={handleImageClick}
                />
                <ChatBubbleListItem messageType={'EXIT'} />
                <ImageChatBubbleListItem
                    memberSent={false}
                    imageSrcList={[
                        faker.image.urlPicsumPhotos(),
                        faker.image.urlPicsumPhotos(),
                        faker.image.urlPicsumPhotos(),
                    ]}
                    onImageClick={handleImageClick}
                />
                <ImageChatBubbleListItem
                    memberSent={false}
                    imageSrcList={[
                        faker.image.urlPicsumPhotos(),
                        faker.image.urlPicsumPhotos(),
                        faker.image.urlPicsumPhotos(),
                        faker.image.urlPicsumPhotos(),
                    ]}
                    onImageClick={handleImageClick}
                />
                <ImageChatBubbleListItem
                    memberSent={false}
                    imageSrcList={[
                        faker.image.urlPicsumPhotos(),
                        faker.image.urlPicsumPhotos(),
                        faker.image.urlPicsumPhotos(),
                        faker.image.urlPicsumPhotos(),
                        faker.image.urlPicsumPhotos(),
                        faker.image.urlPicsumPhotos(),
                    ]}
                    onImageClick={handleImageClick}
                />
            </ul>
            <ImageViewerModal
                isImageViewerModalOpen={isImageViewerModalOpen}
                closeImageViewerModal={() => {
                    setIsImageViewerModalOpen(false);
                }}
                indexOfImageClicked={indexOfImageClicked}
                imageSrcListToView={imageSrcListToView}
            />
        </>
    );
}

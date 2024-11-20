import { nanoid } from 'nanoid';
import { Client } from '@stomp/stompjs';
import { ClipboardEventHandler, KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { GoCodeSquare, GoImage } from 'react-icons/go';
import { IoArrowUpCircleOutline } from 'react-icons/io5';
import SendCodeModal from '@/Components/ChatRelated/SendCode/SendCodeModal.tsx';
import SendImageModal from '@/Components/ChatRelated/SendImage/SendSingleImageModal.tsx';

interface Props {
    client: Client;
    chatRoomId: string;
}

interface ImageInfoToSend {
    id: string;
    localImageUrl: string;
    imageFile: File;
}

export default function SendMessageSection({ client, chatRoomId }: Props) {
    const [isSendCodeModalOpen, setIsSendCodeModalOpen] = useState(false);

    const [isSendImageModalOpen, setIsSendImageModalOpen] = useState(false);

    const [imageInfoToSend, setImageInfoToSend] = useState<ImageInfoToSend | null>(null);

    const handleSendCodeButtonClick = () => {
        setIsSendCodeModalOpen(true);
    };

    const handleSendImageButtonClick = () => {
        setIsSendImageModalOpen(true);
    };

    const handleImagePaste: ClipboardEventHandler<HTMLTextAreaElement> = event => {
        const pastedDataList = Array.from(event.clipboardData.items);

        const imageDataList = pastedDataList
            .filter(data => data.type.includes('image'))
            .filter(
                imageData =>
                    imageData.type.includes('png') || imageData.type.includes('jpg') || imageData.type.includes('jpeg'),
            );
        if (imageDataList.length !== 0) {
            event.preventDefault();
            setIsSendImageModalOpen(true);
            setImageInfoToSend({
                id: nanoid(),
                localImageUrl: URL.createObjectURL(imageDataList[0].getAsFile()),
                imageFile: imageDataList[0].getAsFile(),
            });
        }
    };

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const sendChatMessage = (message: string) => {
        client.publish({
            destination: `/pub/chat/text/${chatRoomId}`,
            body: JSON.stringify({
                messageType: 'TEXT',
                content: message,
            }),
        });

        textAreaRef.current.value = '';
    };

    const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = event => {
        if (event.nativeEvent.isComposing) {
            return;
        }

        if (event.key === 'Enter' && event.shiftKey) {
            return;
        } else if (event.key === 'Enter') {
            const $textAreaElement = event.target as HTMLTextAreaElement;
            const chatMessageToSend = $textAreaElement.value;
            event.preventDefault();
            if (chatMessageToSend.trim().length === 0) {
                return;
            }
            sendChatMessage(chatMessageToSend);

            const $divElement = document.getElementById('scrollableDiv');
            if ($divElement) {
                $divElement.scrollTop = $divElement.scrollHeight;
            }
        }
    };

    const handleSendChatButtonClick = () => {
        const chatMessageToSend = textAreaRef.current.value;
        if (chatMessageToSend.trim().length === 0) {
            return;
        }
        sendChatMessage(chatMessageToSend);
    };

    useEffect(() => {
        textAreaRef.current.focus();
    }, []);

    return (
        <>
            <div className={'flex items-center gap-x-2 rounded-b-xl border-t border-slate-200 bg-slate-50 px-3 py-3'}>
                <div className={'flex items-center gap-x-4'}>
                    <button type={'button'} onClick={handleSendImageButtonClick}>
                        <GoImage className={'size-6 text-slate-500'} />
                    </button>
                    <div
                        className={
                            'tooltip tooltip-top flex items-center justify-center before:-translate-x-3 before:text-[0.75rem]'
                        }
                        data-tip={'준비 중인 서비스입니다.'}
                    >
                        <button
                            className={'disabled:opacity-75'}
                            type={'button'}
                            onClick={handleSendCodeButtonClick}
                            disabled
                        >
                            <GoCodeSquare className={'size-6 text-slate-500'} />
                        </button>
                    </div>
                </div>
                <div className={'flex flex-1 items-center'}>
                    <textarea
                        ref={textAreaRef}
                        placeholder={'메시지를 입력하세요..'}
                        className={
                            'min-w-0 flex-1 resize-none rounded-3xl  border border-slate-200 px-4 py-2 text-[0.8rem] placeholder:text-slate-500 focus:outline-none'
                        }
                        onPaste={handleImagePaste}
                        onKeyDown={handleKeyDown}
                        rows={1}
                    />
                </div>
                <button onClick={handleSendChatButtonClick} type={'button'}>
                    <IoArrowUpCircleOutline className={'size-7 text-plump-purple-600'} />
                </button>
            </div>
            <SendCodeModal
                isSendCodeModalOpen={isSendCodeModalOpen}
                closeSendCodeModal={() => {
                    setIsSendCodeModalOpen(false);
                }}
            />
            <SendImageModal
                chatRoomId={chatRoomId}
                initialImageInfoToSend={imageInfoToSend}
                isSendImageModalOpen={isSendImageModalOpen}
                closeModal={() => {
                    setIsSendImageModalOpen(false);
                }}
            />
        </>
    );
}

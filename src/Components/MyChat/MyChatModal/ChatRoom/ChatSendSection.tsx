import { nanoid } from 'nanoid';
import { CompatClient } from '@stomp/stompjs';
import { ClipboardEventHandler, KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { GoCodeSquare, GoImage } from 'react-icons/go';
import { IoArrowUpCircleOutline } from 'react-icons/io5';
import SendImageModal from '@/Components/ChatRelated/SendImage/SendSingleImageModal.tsx';
import SendCodeModal from '@/Components/ChatRelated/SendCode/SendCodeModal.tsx';

interface Props {
    client?: CompatClient;
    chatRoomId: string;
}

interface ImageInfoToSend {
    id: string;
    localImageUrl: string;
    imageFile: File;
}

export default function ChatSendSection({ client, chatRoomId }: Props) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const [isSendImageModalOpen, setIsSendImageModalOpen] = useState(false);

    const [isSendCodeModalOpen, setIsSendCodeModalOpen] = useState(false);

    const [imageInfoToSend, setImageInfoToSend] = useState<ImageInfoToSend | null>(null);

    useEffect(() => {
        if (!isSendImageModalOpen) {
            setImageInfoToSend(null);
        }
    }, []);

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

    const handleSendChatButtonClick = () => {
        const chatMessageToSend = textAreaRef.current.value;
        if (chatMessageToSend.trim().length === 0) {
            return;
        }
        sendChatMessage(chatMessageToSend);
    };

    return (
        <>
            <div className={'flex items-center gap-x-2 px-3 pt-2'}>
                <div
                    className={
                        'flex w-full items-center gap-x-1 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-1'
                    }
                >
                    <div className={'flex items-center gap-x-3'}>
                        <button
                            onClick={() => {
                                setIsSendImageModalOpen(true);
                            }}
                            type={'button'}
                        >
                            <GoImage className={'size-5 text-slate-500'} />
                        </button>
                        <div
                            className={'tooltip tooltip-top flex items-center justify-center before:text-[0.75rem]'}
                            data-tip={'준비 중인 서비스입니다.'}
                        >
                            <button
                                onClick={() => {
                                    setIsSendCodeModalOpen(true);
                                }}
                                className={'disabled:opacity-75'}
                                type={'button'}
                                disabled={true}
                            >
                                <GoCodeSquare className={'size-5 text-slate-500'} />
                            </button>
                        </div>
                    </div>
                    <textarea
                        placeholder={'메시지를 입력하세요..'}
                        className={
                            'min-w-0 flex-1 resize-none rounded-3xl bg-slate-50 px-4 py-1.5 text-[0.8rem] placeholder:text-slate-500 focus:outline-none'
                        }
                        onKeyDown={handleKeyDown}
                        onPaste={handleImagePaste}
                        ref={textAreaRef}
                        rows={1}
                    />
                    <button onClick={handleSendChatButtonClick} type={'button'}>
                        <IoArrowUpCircleOutline className={'size-7 text-plump-purple-600'} />
                    </button>
                </div>
            </div>
            <SendImageModal
                chatRoomId={chatRoomId}
                initialImageInfoToSend={imageInfoToSend}
                isSendImageModalOpen={isSendImageModalOpen}
                closeModal={() => {
                    setIsSendImageModalOpen(false);
                }}
            />
            <SendCodeModal
                isSendCodeModalOpen={isSendCodeModalOpen}
                closeSendCodeModal={() => {
                    setIsSendCodeModalOpen(false);
                }}
            />
        </>
    );
}

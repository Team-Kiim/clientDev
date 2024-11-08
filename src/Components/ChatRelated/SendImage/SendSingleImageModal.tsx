import axios from 'axios';
import { nanoid } from 'nanoid';
import { ClipboardEventHandler, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { GoImage, GoX } from 'react-icons/go';
import UploadImageZone from '@/Components/ChatRelated/SendImage/SingleImageUploadZone.tsx';
import UploadedImageViewer from '@/Components/ChatRelated/SendImage/UploadedSingleImageViewer.tsx';
import TOAST_OPTIONS from '@/Constants/toastOptions.ts';
import 'react-toastify/dist/ReactToastify.css';

interface ImageInfoToSend {
    id: string;
    localImageUrl: string;
    imageFile: File;
}

interface Props {
    chatRoomId: string;
    initialImageInfoToSend: ImageInfoToSend | null;
    isSendImageModalOpen: boolean;
    closeModal(): void;
}

export default function SendImageModal({
    chatRoomId,
    initialImageInfoToSend,
    isSendImageModalOpen,
    closeModal,
}: Props) {
    const [imageInfoToSend, setImageInfoToSend] = useState<ImageInfoToSend | null>(initialImageInfoToSend);

    const uploadImage = (imageInfo: ImageInfoToSend) => {
        setImageInfoToSend(imageInfo);
    };

    const handleImagePaste: ClipboardEventHandler<HTMLDivElement> = event => {
        event.preventDefault();
        const pastedDataList = Array.from(event.clipboardData.items);

        const imageDataList = pastedDataList
            .filter(data => data.type.includes('image'))
            .filter(
                imageData =>
                    imageData.type.includes('png') || imageData.type.includes('jpg') || imageData.type.includes('jpeg'),
            );

        if (imageDataList.length !== 0) {
            setImageInfoToSend({
                id: nanoid(),
                localImageUrl: URL.createObjectURL(imageDataList[0].getAsFile()),
                imageFile: imageDataList[0].getAsFile(),
            });
        }
    };

    useEffect(() => {
        setImageInfoToSend(initialImageInfoToSend);
    }, [initialImageInfoToSend]);

    const handleDeleteImageButtonClick = () => {
        setImageInfoToSend(null);
    };

    const handleSendImageButtonClick = () => {
        if (!imageInfoToSend) {
            return;
        }

        const formData = new FormData();

        const chatRoomIdBlob = new Blob([chatRoomId], {
            type: 'application/json',
        });

        formData.append('file', imageInfoToSend.imageFile);
        formData.append('chatRoomId', chatRoomIdBlob);

        axios
            .post('/api/file/chat', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(() => {
                closeModal();
            })
            .catch(() => {
                toast.error(
                    <p className={'text-[0.85rem] leading-relaxed'}>
                        이미지 전송에 실패하였습니다.
                        <br />
                        잠시 후 다시 시도해주세요.
                    </p>,
                    TOAST_OPTIONS,
                );
            });
    };

    return (
        <Modal
            isOpen={isSendImageModalOpen}
            className={'fixed left-1/2 top-1/2 w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6'}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 50%)',
                    zIndex: 60,
                },
            }}
            closeTimeoutMS={280}
            onAfterClose={() => {
                setImageInfoToSend(null);
            }}
            shouldCloseOnOverlayClick={false}
        >
            <div className={'flex justify-end'}>
                <button
                    className={'rounded-full p-1 transition-all hover:bg-slate-100'}
                    type={'button'}
                    onClick={() => {
                        closeModal();
                    }}
                >
                    <GoX className={'size-8 text-slate-800'} />
                </button>
            </div>
            <div className={'flex w-full flex-col gap-y-5'} onPaste={handleImagePaste}>
                <div className={'flex items-center gap-x-1'}>
                    <GoImage className={'size-6 text-plump-purple-600'} />
                    <h1 className={'mx-0.5 text-lg font-extrabold'}>이미지 전송</h1>
                </div>
                <div className={'flex flex-col gap-y-3'}>
                    {imageInfoToSend !== null ? (
                        <UploadedImageViewer
                            imageInfoToSend={imageInfoToSend}
                            onDeleteImageButtonClick={handleDeleteImageButtonClick}
                        />
                    ) : (
                        <UploadImageZone uploadImage={uploadImage} />
                    )}
                    <div className={'flex flex-col gap-y-0.5 text-[0.75rem] text-slate-500'}>
                        <span>• .png, .jpg, .jpeg 파일만 업로드할 수 있습니다.</span>
                        <span>• 1개의 이미지만 업로드할 수 있습니다.</span>
                        <span>• 모달 클릭 후 이미지 복사 붙여넣기가 됩니다.</span>
                    </div>
                </div>
                <div className={'flex justify-end gap-x-2'}>
                    <button
                        type={'button'}
                        className={
                            'rounded-lg bg-slate-100 px-3.5 py-2 text-[0.9rem] font-bold transition-all hover:bg-slate-200'
                        }
                        onClick={() => {
                            closeModal();
                        }}
                    >
                        취소
                    </button>
                    <button
                        type={'button'}
                        className={
                            'rounded-lg bg-plump-purple-600 px-3.5 py-2 text-[0.9rem] font-bold text-white transition-all enabled:hover:bg-plump-purple-700 disabled:opacity-75'
                        }
                        disabled={imageInfoToSend === null}
                        onClick={handleSendImageButtonClick}
                    >
                        전송
                    </button>
                </div>
            </div>
        </Modal>
    );
}

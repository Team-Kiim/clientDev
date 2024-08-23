import { useState } from 'react';
import Modal from 'react-modal';
import { GoX } from 'react-icons/go';
import UploadImageZone from '@/Components/ChatRelated/SendImage/UploadImageZone.tsx';
import UploadedImageList from '@/Components/ChatRelated/SendImage/UploadedImageList.tsx';
import UploadedImageViewer from '@/Components/ChatRelated/SendImage/UploadedImageViewer.tsx';

interface Props {
    isSendImageModalOpen: boolean;
    closeSendImageModal(): void;
}

interface UploadedImageInfo {
    id: string;
    localImageUrl: string;
    imageFile: File;
}

export default function SendImageModal({ isSendImageModalOpen, closeSendImageModal }: Props) {
    const [uploadedImageInfoList, setUploadedImageInfoList] = useState<UploadedImageInfo[]>([]);

    const [uploadedImageInfoToView, setUploadedImageInfoToView] = useState<UploadedImageInfo | null>(null);

    const updateUploadedImageInfoList = (imageInfoList: UploadedImageInfo[]) => {
        setUploadedImageInfoList([...uploadedImageInfoList, ...imageInfoList]);
    };

    const handleUploadedImageClick = (imageInfo: UploadedImageInfo) => {
        setUploadedImageInfoToView(imageInfo);
    };

    const handleDeleteImageButtonClick = (imageInfo: UploadedImageInfo) => {
        if (imageInfo.id === uploadedImageInfoToView.id) {
            setUploadedImageInfoToView(null);
        }
        setUploadedImageInfoList(
            uploadedImageInfoList.filter(uploadedImageInfo => uploadedImageInfo.id !== imageInfo.id),
        );
    };

    return (
        <Modal
            isOpen={isSendImageModalOpen}
            className={'fixed left-1/2 top-1/2 w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-8'}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 50%)',
                    zIndex: 60,
                },
            }}
            closeTimeoutMS={280}
            onAfterClose={() => {
                setUploadedImageInfoList([]);
                setUploadedImageInfoToView(null);
            }}
        >
            <button
                className={'absolute right-8 top-8 rounded-full p-1 transition-all hover:bg-slate-100'}
                type={'button'}
                onClick={() => {
                    closeSendImageModal();
                }}
            >
                <GoX className={'size-8'} />
            </button>
            <div className={'flex w-full flex-col gap-y-5'}>
                <h1 className={'mx-0.95 text-lg font-extrabold'}>이미지 전송</h1>
                <div className={'flex gap-x-6'}>
                    <div className={'flex w-1/2 flex-shrink-0 flex-col gap-y-10'}>
                        <UploadImageZone updateUploadedImageInfoList={updateUploadedImageInfoList} />
                        <UploadedImageList
                            uploadedImageInfoList={uploadedImageInfoList}
                            onUploadedImageClick={handleUploadedImageClick}
                            onDeleteImageButtonClick={handleDeleteImageButtonClick}
                        />
                    </div>
                    <div className={'flex w-[calc(50%-1.5rem)] flex-shrink-0 flex-col justify-between'}>
                        <UploadedImageViewer uploadImageInfoToView={uploadedImageInfoToView} />
                        <div className={'flex justify-end gap-x-3'}>
                            <button
                                className={
                                    'rounded-lg bg-slate-100 px-4 py-2.5 text-[0.9rem] font-bold transition-all hover:bg-slate-200'
                                }
                                type={'button'}
                                onClick={() => {
                                    closeSendImageModal();
                                }}
                            >
                                취소
                            </button>
                            <button
                                className={
                                    'rounded-lg bg-violet-600 px-4 py-2.5 text-[0.9rem] font-bold text-white transition-all enabled:hover:bg-violet-700 disabled:cursor-default disabled:opacity-75'
                                }
                                type={'button'}
                                disabled={uploadedImageInfoList.length === 0}
                            >
                                전송
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

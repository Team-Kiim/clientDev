import { useCallback, useState } from 'react';
import Modal from 'react-modal';
import { GoX } from 'react-icons/go';
import ImageViewer from '@/Components/ChatRelated/ImageViewer/ImageViewer.tsx';

interface Props {
    isImageViewerModalOpen: boolean;
    closeImageViewerModal(): void;
    indexOfImageClicked: number;
    imageSrcListToView: string[];
}

export default function ImageViewerModal({
    isImageViewerModalOpen,
    closeImageViewerModal,
    indexOfImageClicked,
    imageSrcListToView,
}: Props) {
    const [currentIndexOfImageSrcList, setCurrentIndexOfImageSrcList] = useState(-1);

    const handlePreviousImageButtonClick = useCallback((newIndex: number) => {
        setCurrentIndexOfImageSrcList(newIndex);
    }, []);

    const handleNextImageButtonClick = useCallback((newIndex: number) => {
        setCurrentIndexOfImageSrcList(newIndex);
    }, []);

    return (
        <Modal
            isOpen={isImageViewerModalOpen}
            className={'fixed left-1/2 top-1/2 flex w-[30rem] -translate-x-1/2 -translate-y-1/2'}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 50%)',
                    zIndex: 60,
                },
            }}
            closeTimeoutMS={280}
            onAfterOpen={() => {
                setCurrentIndexOfImageSrcList(indexOfImageClicked);
            }}
        >
            <button
                className={'absolute -top-14 right-0 rounded-full p-1 hover:bg-neutral-800/40'}
                type={'button'}
                onClick={() => {
                    closeImageViewerModal();
                }}
            >
                <GoX className={'size-10 text-white'} />
            </button>
            <ImageViewer
                currentIndexOfImageSrcList={currentIndexOfImageSrcList}
                currentImageSrc={imageSrcListToView[currentIndexOfImageSrcList]}
                imageSrcListLength={imageSrcListToView.length}
                onPreviousImageButtonClick={handlePreviousImageButtonClick}
                onNextImageButtonClick={handleNextImageButtonClick}
            />
        </Modal>
    );
}

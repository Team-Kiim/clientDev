import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

interface Props {
    currentIndexOfImageSrcList: number;
    currentImageSrc: string;
    imageSrcListLength: number;
    onPreviousImageButtonClick(newIndex: number): void;
    onNextImageButtonClick(newIndex: number): void;
}

export default function ImageViewer({
    currentIndexOfImageSrcList,
    currentImageSrc,
    imageSrcListLength,
    onPreviousImageButtonClick,
    onNextImageButtonClick,
}: Props) {
    return (
        <div className={'relative w-full'}>
            {currentIndexOfImageSrcList === 0 ? (
                <>
                    <div className={'w-full'}>
                        <img className={'w-full'} src={currentImageSrc} alt={currentImageSrc} />
                    </div>
                    {imageSrcListLength !== 1 && (
                        <button
                            className={
                                'absolute -right-16 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-neutral-800/40'
                            }
                            type={'button'}
                            onClick={() => {
                                onNextImageButtonClick(1);
                            }}
                        >
                            <GoChevronRight className={'size-10 text-white'} />
                        </button>
                    )}
                </>
            ) : currentIndexOfImageSrcList === imageSrcListLength - 1 ? (
                <>
                    <div className={'w-full'}>
                        <img className={'w-full'} src={currentImageSrc} alt={currentImageSrc} />
                    </div>
                    <button
                        className={
                            'absolute -left-16 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-neutral-800/40'
                        }
                        type={'button'}
                        onClick={() => {
                            onPreviousImageButtonClick(imageSrcListLength - 2);
                        }}
                    >
                        <GoChevronLeft className={'size-10 text-white'} />
                    </button>
                </>
            ) : (
                <div className={'w-full'}>
                    <img className={'w-full'} src={currentImageSrc} alt={currentImageSrc} />
                    <button
                        className={
                            'absolute -right-16 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-neutral-800/40'
                        }
                        type={'button'}
                        onClick={() => {
                            onNextImageButtonClick(currentIndexOfImageSrcList + 1);
                        }}
                    >
                        <GoChevronRight className={'size-10 text-white'} />
                    </button>
                    <button
                        className={
                            'absolute -left-16 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-neutral-800/40'
                        }
                        type={'button'}
                        onClick={() => {
                            onPreviousImageButtonClick(currentIndexOfImageSrcList - 1);
                        }}
                    >
                        <GoChevronLeft className={'size-10 text-white'} />
                    </button>
                </div>
            )}
        </div>
    );
}

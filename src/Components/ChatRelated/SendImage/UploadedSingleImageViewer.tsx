import { GoX } from 'react-icons/go';

interface ImageInfoToSend {
    id: string;
    localImageUrl: string;
    imageFile: File;
}

interface Props {
    imageInfoToSend: ImageInfoToSend;
    onDeleteImageButtonClick(): void;
}

export default function UploadedImageViewer({ imageInfoToSend, onDeleteImageButtonClick }: Props) {
    const { localImageUrl } = imageInfoToSend;

    return (
        <div className={'relative'}>
            <button
                type={'button'}
                className={
                    'absolute -right-2 -top-2 overflow-y-auto rounded-full border-4 border-white bg-black p-1.5 transition-all hover:scale-110'
                }
                onClick={onDeleteImageButtonClick}
            >
                <GoX className={'size-5 text-white'} />
            </button>
            <div className={' max-h-80 min-h-60 w-full overflow-y-auto rounded-xl border border-white scrollbar-hide'}>
                <img src={localImageUrl} alt={'imageToSend'} />
            </div>
        </div>
    );
}

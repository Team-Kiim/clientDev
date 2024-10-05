import { nanoid } from 'nanoid';
import { useDropzone } from 'react-dropzone';
import { GoUpload } from 'react-icons/go';

interface ImageInfoToSend {
    id: string;
    localImageUrl: string;
    imageFile: File;
}

interface Props {
    uploadImage(imageInfo: ImageInfoToSend): void;
}

export default function UploadImageZone({ uploadImage }: Props) {
    const onDrop = (acceptedFiles: File[]) => {
        const imageInfoToSend: ImageInfoToSend = {
            id: nanoid(),
            localImageUrl: URL.createObjectURL(acceptedFiles[0]),
            imageFile: acceptedFiles[0],
        };

        uploadImage(imageInfoToSend);
    };

    const { getRootProps, getInputProps, open, isDragAccept } = useDropzone({
        onDrop,
        multiple: false,
        noKeyboard: true,
        noClick: true,
        accept: {
            'image/jpeg': [],
            'image/png': [],
        },
    });

    return (
        <div
            className={`flex h-60 w-full items-center justify-center rounded-xl border border-dashed ${isDragAccept ? 'border-plump-purple-600' : 'border-slate-300'} transition-all`}
            {...getRootProps()}
        >
            <input {...getInputProps()} />
            <div className={'flex w-full flex-col items-center justify-center gap-y-2.5'}>
                <div className={'rounded-full bg-plump-purple-50 p-1.5'}>
                    <GoUpload className={'size-6 text-plump-purple-600'} />
                </div>
                <p className={'text-[0.8rem] font-bold text-slate-500'}>드로그 앤 드롭으로 파일을 추가해 보세요.</p>
                <span className={'text-[0.75rem] font-bold text-slate-400'}>또는</span>
                <button
                    className={
                        'rounded-3xl border border-plump-purple-600 bg-plump-purple-50 px-3.5 py-1.5 text-[0.8rem] font-bold text-plump-purple-600 transition-all hover:bg-plump-purple-100'
                    }
                    onClick={open}
                    type={'button'}
                >
                    파일 탐색
                </button>
            </div>
        </div>
    );
}

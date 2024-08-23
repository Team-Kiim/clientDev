import { nanoid } from 'nanoid';
import { useDropzone } from 'react-dropzone';
import { GoUpload } from 'react-icons/go';

interface UploadedImageInfo {
    id: string;
    localImageUrl: string;
    imageFile: File;
}

interface Props {
    updateUploadedImageInfoList(imageInfoList: UploadedImageInfo[]): void;
}

export default function UploadImageZone({ updateUploadedImageInfoList }: Props) {
    const onDrop = (acceptedFiles: File[]) => {
        const imageInfoList: UploadedImageInfo[] = acceptedFiles.map(acceptedFile => {
            return {
                id: nanoid(),
                localImageUrl: URL.createObjectURL(acceptedFile),
                imageFile: acceptedFile,
            };
        });
        updateUploadedImageInfoList(imageInfoList);
    };

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        noKeyboard: true,
        noClick: true,
        accept: {
            'image/jpeg': [],
            'image/png': [],
        },
    });

    return (
        <div className={'flex flex-col gap-y-2 '}>
            <span className={'w-fit text-[0.9rem] font-bold'}>이미지 업로드</span>
            <div
                className={
                    'flex h-60 w-full items-center justify-center rounded-lg border border-dashed border-slate-300'
                }
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                <div className={'flex w-full flex-col items-center justify-center gap-y-2.5'}>
                    <div className={'rounded-full bg-violet-50 p-1.5'}>
                        <GoUpload className={'size-6 text-violet-700'} />
                    </div>
                    <p className={'text-[0.85rem] font-bold'}>드로그 앤 드롭으로 파일을 추가해 보세요.</p>
                    <span className={'text-[0.8rem] font-bold text-slate-500'}>또는</span>
                    <button
                        className={
                            'rounded-lg border border-violet-300 bg-violet-50 px-3.5 py-1.5 text-[0.85rem] font-bold text-violet-700'
                        }
                        onClick={open}
                        type={'button'}
                    >
                        파일 탐색
                    </button>
                </div>
            </div>
        </div>
    );
}

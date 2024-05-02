import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

interface Props {
    uploadFiles: (files: File[]) => void;
}

export default function FileUploadZone({ uploadFiles }: Props) {
    const onDrop = (acceptedFiles: File[]) => {
        uploadFiles(acceptedFiles);
    };

    const { getRootProps, getInputProps, open } = useDropzone({ onDrop, noKeyboard: true, noClick: true });

    return (
        <div
            className={
                'mt-2 flex h-48 w-full items-center justify-center rounded-lg border border-dashed border-gray-300'
            }
            {...getRootProps()}
        >
            <input {...getInputProps()} />
            <div className={'flex w-full flex-col items-center justify-center gap-y-2'}>
                <div className={'rounded-full bg-violet-50 p-1.5'}>
                    <FiUpload className={'size-7 text-violet-600'} />
                </div>
                <span className={'text-[0.95rem] font-medium'}>드로그 앤 드롭으로 파일을 추가</span>
                <span className={'text-sm text-gray-600'}>또는</span>
                <button
                    className={'rounded-lg px-2 py-1 transition-all hover:bg-violet-50'}
                    type={'button'}
                    onClick={open}
                >
                    <span className={'text-[0.95rem] font-medium text-violet-600'}>파일 탐색</span>
                </button>
            </div>
        </div>
    );
}

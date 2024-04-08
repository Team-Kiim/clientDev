import { useDropzone } from 'react-dropzone';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';

interface Props {
    addFiles: (files: File[]) => void;
}

export default function FileUploadZone({ addFiles }: Props) {
    const onDrop = (acceptedFiles: File[]) => {
        addFiles(acceptedFiles);
    };

    const { getRootProps, getInputProps, open } = useDropzone({ onDrop, noKeyboard: true, noClick: true });

    return (
        <>
            <div className={'relative mt-2 h-52 rounded-md border border-gray-300'} {...getRootProps()}>
                <input {...getInputProps()} />
                <div
                    className={
                        'absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-y-3'
                    }
                >
                    <div className={'rounded-full bg-violet-50 p-1.5'}>
                        <ArrowUpTrayIcon className={'size-8 text-violet-600'} />
                    </div>
                    <span className={'font-medium'}>드로그 앤 드롭으로 파일 추가</span>
                    <span className={'text-sm text-gray-600'}>또는</span>
                    <button
                        type={'button'}
                        className={'rounded-lg px-2 py-1 transition-all hover:bg-violet-50'}
                        onClick={open}
                    >
                        <span className={'font-medium text-violet-600'}>파일 탐색</span>
                    </button>
                </div>
            </div>
        </>
    );
}

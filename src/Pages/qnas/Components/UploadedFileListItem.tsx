import { CiFileOn } from 'react-icons/ci';
import { TrashIcon } from '@heroicons/react/24/outline';
import formatBytes from '@/Utils/formatBytes.ts';

interface FileData {
    id: string | number;
    file: File;
}

interface Props {
    fileData: FileData;
    onFileDeleteButtonClick: (targetFile: FileData) => void;
}

export default function UploadedFileListItem({ fileData, onFileDeleteButtonClick }: Props) {
    console.log(fileData);
    console.log(formatBytes(fileData.file.size));

    return (
        <li className={'flex w-full items-center gap-x-2 rounded-md border border-gray-300 p-3'}>
            <CiFileOn className={'size-7'} />
            <div className={'flex-1'}>
                <span className={'font-medium'}>{fileData.file.name}</span>
            </div>
            <span className={'text-[0.95rem] text-gray-600'}>{formatBytes(fileData.file.size)}</span>
            <button
                className={'rounded-full p-2 transition-all hover:bg-red-50 hover:text-red-700'}
                type={'button'}
                onClick={() => {
                    onFileDeleteButtonClick(fileData);
                }}
            >
                <TrashIcon className={'size-5'} />
            </button>
        </li>
    );
}

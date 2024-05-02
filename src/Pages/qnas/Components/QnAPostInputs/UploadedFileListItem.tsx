import { CiFileOn } from 'react-icons/ci';
import { TrashIcon } from '@heroicons/react/24/outline';

interface FileData {
    id: string | number;
    file: File | { name: string };
}

interface Props {
    fileData: FileData;
    onFileDeleteButtonClick: (targetFile: FileData) => void;
}

export default function UploadedFileListItem({ fileData, onFileDeleteButtonClick }: Props) {
    return (
        <li className={'flex w-full items-center justify-between'}>
            <div className={'flex flex-1 items-center gap-x-2'}>
                <CiFileOn className={'size-7'} />
                <span className={'line-clamp-1 flex-1 text-[0.9rem] font-medium'}>{fileData.file.name}</span>
            </div>
            <div className={'flex items-center gap-x-2'}>
                <button
                    className={'rounded-full p-2 transition-all hover:bg-red-50 hover:text-red-700'}
                    type={'button'}
                    onClick={() => {
                        onFileDeleteButtonClick(fileData);
                    }}
                >
                    <TrashIcon className={'size-5'} />
                </button>
            </div>
        </li>
    );
}

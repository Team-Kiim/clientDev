import UploadedFileListItem from '@/Pages/qnas/Components/UploadedFileListItem.tsx';

interface FileData {
    id: string | number;
    file: File;
}

interface Props {
    fileInformation: FileData[];
    onFileDeleteButtonClick: (targetFile: FileData) => void;
}

export default function UploadedFileList({ fileInformation, onFileDeleteButtonClick }: Props) {
    return (
        <ul
            className={
                'scrollbar-hide mt-2 flex h-64 flex-col gap-y-2.5 overflow-y-auto rounded-md border border-gray-300 p-3'
            }
        >
            {fileInformation.map(fileData => {
                return (
                    <UploadedFileListItem
                        key={fileData.id}
                        fileData={fileData}
                        onFileDeleteButtonClick={onFileDeleteButtonClick}
                    />
                );
            })}
        </ul>
    );
}

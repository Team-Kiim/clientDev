import UploadedFileListItem from '@/Pages/qnas/Components/QnAPostInputs/UploadedFileListItem.tsx';

interface FileData {
    id: string | number;
    file: File | { name: string };
}

interface Props {
    uploadedFiles: FileData[];
    onFileDeleteButtonClick: (targetFile: FileData) => void;
}

export default function UploadedFileList({ uploadedFiles, onFileDeleteButtonClick }: Props) {
    return (
        <ul className={'mt-2 flex h-48 w-full flex-col gap-y-4 overflow-y-auto scrollbar-hide'}>
            {uploadedFiles.map(fileData => {
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

import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import TitleInput from '@/Pages/qnas/write/Components/TitleInput.tsx';
import FileUploadZone from '@/Pages/qnas/write/Components/FileUploadZone.tsx';
import TextEditor from '@/Pages/qnas/write/Components/TextEditor.tsx';
import UploadedFileList from '@/Pages/qnas/write/Components/UploadedFileList.tsx';

interface FormData {
    title: string;
    bodyContent: string;
    keywords: string[];
}

interface FileData {
    id: string;
    file: File;
}

export default function QnAWriteForm() {
    const [uploadedFiles, setUploadedFiles] = useState<FileData[]>([]);

    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const formMethods = useForm<FormData>({
        mode: 'onBlur',
        defaultValues: {
            title: '',
            bodyContent: '',
            keywords: [],
        },
    });

    useEffect(() => {
        formMethods.reset();
        setUploadedFiles([]);
    }, [searchParams]);

    const uploadFiles = (files: File[]) => {
        const newUploadedFiles: FileData[] = files.map(file => {
            return {
                id: nanoid(),
                file,
            };
        });

        setUploadedFiles([...uploadedFiles, ...newUploadedFiles]);
    };

    const handleFileDeleteButtonClick = (targetFile: FileData) => {
        setUploadedFiles(uploadedFiles.filter(file => file.id !== targetFile.id));
    };

    const onSubmit: SubmitHandler<FormData> = data => {
        console.log(data);
    };

    return (
        <FormProvider {...formMethods}>
            <form className={'mt-3 flex flex-col gap-y-14'} onSubmit={formMethods.handleSubmit(onSubmit)}>
                <TitleInput />
                <div className={'flex flex-col gap-y-3'}>
                    <TextEditor />
                </div>
                <div className={'flex flex-col gap-y-2'}>
                    <h3 className={'text-[1.05rem] font-medium'}>첨부 파일</h3>
                    <div className={'flex gap-x-2'}>
                        <FileUploadZone uploadFiles={uploadFiles} />
                    </div>
                </div>
                {uploadedFiles.length !== 0 && (
                    <div className={'flex flex-col gap-y-2'}>
                        <h3 className={'text-[1.05rem] font-medium'}>
                            업로드 된 파일 (<span className={'text-violet-600'}>{uploadedFiles.length}</span>){' '}
                        </h3>
                        <UploadedFileList
                            uploadedFiles={uploadedFiles}
                            onFileDeleteButtonClick={handleFileDeleteButtonClick}
                        />
                    </div>
                )}
                <div className={'mb-10 flex w-full justify-end gap-x-3'}>
                    <button
                        className={'rounded-lg px-3 py-2 transition-all hover:bg-violet-50'}
                        type={'button'}
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        <span className={'text-[0.95rem] font-medium text-violet-600'}>취소하기</span>
                    </button>
                    <button
                        className={'rounded-lg bg-violet-600 px-3 py-2 transition-all hover:bg-violet-700'}
                        type={'submit'}
                    >
                        <span className={'text-[0.95rem] font-medium text-white'}>작성하기</span>
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}

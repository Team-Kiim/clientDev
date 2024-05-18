import dompurify from 'dompurify';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import getSinglePostData from '@/Pages/qnas/Utils/getSinglePostData.ts';
import TitleInput from '@/Pages/qnas/Components/QnAPostInputs/TitleInput.tsx';
import TextEditor from '@/Pages/qnas/Components/QnAPostInputs/TextEditor.tsx';
import FileUploadZone from '@/Pages/qnas/Components/QnAPostInputs/FileUploadZone.tsx';
import UploadedFileList from '@/Pages/qnas/Components/QnAPostInputs/UploadedFileList.tsx';
import useQnATypeStore from '@/Stores/useQnATypeStore.ts';

interface FormData {
    title: string;
    bodyContent: string;
    keywords: string[];
}

interface FileData {
    id: string | number;
    file: File | { name: string };
    isExisted?: boolean;
}

export default function QnAEditForm() {
    const { qnaType, updateQnAType } = useQnATypeStore(state => state);

    const navigate = useNavigate();

    const postId = useParams().postId;

    const { data } = useSuspenseQuery({
        queryKey: ['post', postId],
        queryFn: getSinglePostData,
    });

    const formMethods = useForm({
        mode: 'onBlur',
        defaultValues: {
            title: data.title,
            bodyContent: data.bodyContent,
            keywords: data.skillCategories,
        },
    });

    useEffect(() => {
        updateQnAType(data.qnaType);
    }, []);

    const existingFileData = data.fileDtoList;
    console.log(existingFileData);

    const [existingFileIdList, setExistingFileIdList] = useState(existingFileData.map(file => file.id));

    const [uploadedFiles, setUploadedFiles] = useState<FileData[]>(
        existingFileData.map(file => ({
            file: { name: file.originalFileName },
            id: file.id,
            isExisted: true,
        })),
    );

    const uploadFiles = (files: File[]) => {
        const newUploadedFiles: FileData[] = files.map(file => ({
            id: nanoid(),
            file,
        }));

        setUploadedFiles([...uploadedFiles, ...newUploadedFiles]);
    };

    const handleFileDeleteButtonClick = (targetFile: FileData) => {
        if ('isExisted' in targetFile) {
            setExistingFileIdList(existingFileIdList.filter(id => id !== targetFile.id));
        } else {
            setUploadedFiles(uploadedFiles.filter(fileData => fileData.id !== targetFile.id));
        }
    };

    const onSubmit: SubmitHandler<FormData> = data => {
        console.log(dompurify.sanitize(data.bodyContent));
    };

    return (
        <FormProvider {...formMethods}>
            <form className={'mt-3 flex flex-col gap-y-14'} onSubmit={formMethods.handleSubmit(onSubmit)}>
                <TitleInput />
                <div className={'flex flex-col gap-y-3'}>
                    <TextEditor />
                </div>
                <div className={'flex flex-col gap-y-2'}>
                    <h3 className={'text-[0.95rem] font-bold'}>첨부 파일</h3>
                    <div className={'flex gap-x-2'}>
                        <FileUploadZone uploadFiles={uploadFiles} />
                    </div>
                </div>
                {uploadedFiles.length !== 0 && (
                    <div className={'flex flex-col gap-y-2'}>
                        <h3 className={'text-[0.95rem] font-bold'}>
                            업로드 된 파일 (<span className={'text-violet-700'}>{uploadedFiles.length}</span>){' '}
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
                            navigate('/');
                        }}
                    >
                        <span className={'text-[0.95rem] font-bold text-violet-600'}>취소하기</span>
                    </button>
                    <button
                        className={'rounded-lg bg-violet-600 px-3 py-2 transition-all hover:bg-violet-700'}
                        type={'submit'}
                    >
                        <span className={'text-[0.95rem] font-bold text-white'}>수정하기</span>
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}

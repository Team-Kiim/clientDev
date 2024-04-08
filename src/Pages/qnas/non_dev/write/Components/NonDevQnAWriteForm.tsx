import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import TitleInput from '@/Pages/qnas/Components/TitleInput.tsx';

import FileUploadZone from '@/Pages/qnas/Components/FileUploadZone.tsx';

interface FormData {
    title: string;
    bodyContent: string;
    // TODO: 키워드에 관련한 객체 프로퍼티 타입 추가하기
}

interface FileData {
    id: string;
    file: File;
}

export default function NonDevQnAWriteForm() {
    const [fileInformation, setFileInformation] = useState<FileData[]>();

    const navigate = useNavigate();

    const formMethods = useForm<FormData>({
        mode: 'onBlur',
    });

    const addFiles = (files: File[]) => {
        const newFileInformation: FileData[] = files.map(file => {
            return {
                id: nanoid(),
                file,
            };
        });
        setFileInformation([...fileInformation, ...newFileInformation]);
    };

    const handleFileDeleteButtonClick = (targetFile: FileData) => {
        setFileInformation(fileInformation.filter(fileDate => fileDate.id !== targetFile.id));
    };

    const onSubmit: SubmitHandler<FormData> = data => {
        console.log(data);
    };

    return (
        <>
            <FormProvider {...formMethods}>
                <form className={'mt-7 flex flex-col gap-y-10'} onSubmit={formMethods.handleSubmit(onSubmit)}>
                    <div>
                        <TitleInput />
                    </div>
                    <div>
                        <h3 className={'mx-2 text-lg font-medium'}>첨부 파일</h3>
                        <FileUploadZone addFiles={addFiles} />
                    </div>
                </form>
            </FormProvider>
        </>
    );
}

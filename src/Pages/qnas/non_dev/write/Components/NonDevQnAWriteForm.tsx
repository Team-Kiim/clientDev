import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import TitleInput from '@/Pages/qnas/Components/TitleInput.tsx';
import TextEditor from '@/Pages/qnas/Components/TextEditor/TextEditor.tsx';
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
        defaultValues: {
            bodyContent: '',
        },
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
                        <TextEditor />
                    </div>
                    <div>
                        <h3 className={'mx-2 text-lg font-medium'}>첨부 파일</h3>
                        <FileUploadZone addFiles={addFiles} />
                    </div>
                    <div className={'mb-10 flex w-full justify-end gap-x-4'}>
                        <button
                            className={
                                'rounded-lg px-3 py-2 text-[0.95rem] font-medium text-violet-600 transition-all hover:bg-violet-50'
                            }
                            type={'button'}
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            취소하기
                        </button>
                        <button
                            className={
                                'rounded-lg bg-violet-600 px-3 py-2 text-[0.95rem] font-medium text-white transition-all hover:bg-violet-700'
                            }
                            type={'submit'}
                        >
                            작성하기
                        </button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
}

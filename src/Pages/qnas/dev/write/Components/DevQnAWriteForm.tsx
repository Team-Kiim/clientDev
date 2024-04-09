import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import TitleInput from '@/Pages/qnas/Components/TitleInput.tsx';
import TextEditor from '@/Pages/qnas/Components/TextEditor/TextEditor.tsx';
import SourceCodeSection from '@/Pages/qnas/dev/Components/SourceCodeSection.tsx';
import FileUploadZone from '@/Pages/qnas/Components/FileUploadZone.tsx';

interface FormData {
    title: string;
    bodyContent: string;
    skillCategories: string;
    sourceCode?: string;
}

interface FileData {
    id: string | number;
    file: File;
}

export default function DevQnAWriteForm() {
    const [isSourceCodeInputOpen, setIsSourceCodeInputOpen] = useState(false);

    const [fileInformation, setFileInformation] = useState<FileData[]>();

    const navigate = useNavigate();

    const formMethods = useForm<FormData>({
        mode: 'onBlur',
        defaultValues: {
            bodyContent: '',
        },
    });

    useEffect(() => {
        if (isSourceCodeInputOpen) {
            formMethods.register('sourceCode');
        } else {
            formMethods.unregister(['sourceCode']);
        }
    }, [isSourceCodeInputOpen]);

    const addFiles = (files: File[]) => {
        const newFileInformation: FileData[] = files.map(file => {
            return {
                id: new Date().getTime(),
                file,
            };
        });
        setFileInformation([...fileInformation, ...newFileInformation]);
    };

    const handleFileDeleteButtonClick = (targetFile: FileData) => {
        setFileInformation(fileInformation.filter(fileData => fileData.id !== targetFile.id));
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
                        <div className={'flex items-center'}>
                            <h3 className={'ml-2 mr-1 text-lg font-medium'}>소스 코드</h3>
                            {isSourceCodeInputOpen ? (
                                <button
                                    className={'rounded-lg px-2 py-1 transition-all hover:bg-red-50'}
                                    type={'button'}
                                    onClick={() => {
                                        if (formMethods.getValues('sourceCode') === '') {
                                            setIsSourceCodeInputOpen(false);
                                            return;
                                        }
                                        if (
                                            window.confirm('지금까지 작성한 소스 코드가 삭제됩니다. 삭제하시겠습니까?')
                                        ) {
                                            setIsSourceCodeInputOpen(false);
                                        }
                                    }}
                                >
                                    <span className={'font-medium text-red-700'}>삭제</span>
                                </button>
                            ) : (
                                <button
                                    className={'rounded-lg px-2 py-1 transition-all hover:bg-violet-50'}
                                    type={'button'}
                                    onClick={() => {
                                        setIsSourceCodeInputOpen(true);
                                    }}
                                >
                                    <span className={'font-medium text-violet-600'}>첨부</span>
                                </button>
                            )}
                        </div>
                        {isSourceCodeInputOpen && <SourceCodeSection />}
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

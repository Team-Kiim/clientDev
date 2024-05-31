import axios from 'axios';
import { Controller, useFormContext } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'react-router-dom';

interface Props {
    postId: number;
}

interface FormData {
    bodyContent: string;
}

const editorConfiguration = {
    toolbar: {
        items: [
            'undo',
            'redo',
            '|',
            'heading',
            'bold',
            'italic',
            'underline',
            'fontColor',
            'blockQuote',
            'link',
            'horizontalLine',
            'code',
            'codeBlock',
            'imageUpload',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'alignment',
        ],
    },
    language: 'ko',
    image: {
        toolbar: ['imageTextAlternative'],
    },
    table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
    codeBlock: {
        languages: [
            { language: 'c', label: 'C' },
            { language: 'cpp', label: 'C++' },
            { language: 'cs', label: 'C#' },
            { language: 'css', label: 'CSS' },
            { language: 'dart', label: 'Dart' },
            { language: 'docker', label: 'Dockerfile' },
            { language: 'go', label: 'Go' },
            { language: 'gradle', label: 'Gradle' },
            { language: 'graphql', label: 'GraphQL' },
            { language: 'groovy', label: 'Groovy' },
            { language: 'html', label: 'HTML' },
            { language: 'haskell', label: 'Haskell' },
            { language: 'json', label: 'JSON' },
            { language: 'java', label: 'Java' },
            { language: 'javascript', label: 'JavaScript' },
            { language: 'kotlin', label: 'Kotlin' },
            { language: 'tex', label: 'LaTeX' },
            { language: 'markdown', label: 'Markdown' },
            { language: 'matlab', label: 'Matlab' },
            { language: 'mermaid', label: 'Mermaid' },
            { language: 'nginx', label: 'Nginx' },
            { language: 'obj-c', label: 'Objective C' },
            { language: 'php', label: 'PHP' },
            { language: 'perl', label: 'Perl' },
            { language: 'python', label: 'Python' },
            { language: 'r', label: 'R' },
            { language: 'ruby', label: 'Ruby' },
            { language: 'rust', label: 'Rust' },
            { language: 'sql', label: 'SQL' },
            { language: 'swift', label: 'Swift' },
            { language: 'typescript', label: 'TypeScript' },
        ],
    },
    placeholder: '게시글 내용을 입력해주세요.',
};

export default function TextEditor({ postId }: Props) {
    const { VITE_SERVER_URL } = import.meta.env;

    const {
        control,
        formState: { errors },
    } = useFormContext<FormData>();

    const customUploadAdapter = loader => {
        return {
            upload() {
                return new Promise((resolve, reject) => {
                    const data = new FormData();
                    loader.file.then(file => {
                        const fileBlob = new Blob([file], {
                            type: 'application/octet-stream',
                        });
                        const postIdBlob = new Blob([JSON.stringify(postId)], {
                            type: 'application/json',
                        });

                        data.append('file', fileBlob);
                        data.append('postId', postIdBlob);

                        axios
                            .post('/api/file/image', data, {
                                headers: { 'Content-Type': 'multipart/form-data' },
                            })
                            .then(res => {
                                const imgName = res.data.name;
                                const postType = res.data.path;
                                resolve({
                                    default: `${VITE_SERVER_URL}/image/${postType}/${imgName}`,
                                });
                            })
                            .catch(err => reject(err));
                    });
                });
            },
        };
    };

    function uploadPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = loader => {
            return customUploadAdapter(loader);
        };
    }

    const [searchParams] = useSearchParams();

    return (
        <div className={'flex flex-col gap-y-1.5'}>
            <Controller
                control={control}
                name={'bodyContent'}
                rules={{
                    required: {
                        value: true,
                        message: '게시글 내용을 입력해주세요.',
                    },
                }}
                render={({ field }) => {
                    return (
                        <div className={'prose w-full max-w-full prose-strong:text-inherit'}>
                            <CKEditor
                                // id 가 변경되면, 에디터의 content 가 초기화 된다.
                                //
                                // When this property changes,
                                // the component restarts the editor with new data instead of setting it on an initialized editor.
                                // (출처: 공식문서)
                                id={searchParams}
                                data={field.value}
                                // @ts-ignore
                                editor={Editor}
                                config={{
                                    ...editorConfiguration,
                                    extraPlugins: [uploadPlugin],
                                }}
                                onChange={(_, editor) => {
                                    field.onChange(editor.getData());
                                }}
                                onBlur={field.onBlur}
                            />
                        </div>
                    );
                }}
            />
            {errors?.bodyContent?.message && errors?.bodyContent.type === 'required' && (
                <div className={'m-0.5 flex items-center gap-x-1 text-red-700'}>
                    <ExclamationTriangleIcon className={'size-5'} />
                    <p className={'text-sm font-bold'}>{errors.bodyContent.message}</p>
                </div>
            )}
        </div>
    );
}

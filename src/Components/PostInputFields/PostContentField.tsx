import axios from 'axios';
import { useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';
import Editor from '../../../ckeditor5';

interface Props {
    postId: number | string;
}

interface FormData {
    bodyContent: string;
}

const editorConfiguration = {
    toolbar: {
        items: [
            'undo',
            'redo',
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
            'bulletedList',
            'numberedList',
            'alignment',
        ],
    },
    language: 'ko',
    image: {
        toolbar: ['imageTextAlternative'],
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
            { language: 'jsx', label: 'JSX' },
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
            { language: 'tsx', label: 'TSX' },
        ],
    },
    placeholder: '게시글 내용을 입력해주세요.',
};

export default function PostContentField({ postId }: Props) {
    const { VITE_SERVER_URL } = import.meta.env;

    const {
        control,
        formState: { errors },
    } = useFormContext<FormData>();

    const { field } = useController({
        name: 'bodyContent',
        control,
        rules: {
            required: {
                value: true,
                message: '게시글 내용을 입력해주세요.',
            },
        },
    });

    const editorRef = useRef(null);

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

    return (
        <div className={'flex flex-col gap-y-2'}>
            <label
                className={'mx-1 w-fit text-[0.9rem] font-bold'}
                htmlFor={'bodyContentInput'}
                onClick={() => {
                    if (editorRef.current) {
                        editorRef.current.focus();
                    }
                }}
            >
                게시글 내용
                <span className={'text-red-500'}>﹡</span>
            </label>
            <div className={'prose w-full max-w-full text-[0.95rem] text-black prose-strong:text-inherit'}>
                <CKEditor
                    id={'bodyContentInput'}
                    //@ts-ignore
                    editor={Editor}
                    data={field.value}
                    config={{
                        ...editorConfiguration,
                        extraPlugins: [uploadPlugin],
                    }}
                    onChange={(_, editor) => {
                        field.onChange(editor.getData());
                    }}
                    onBlur={field.onBlur}
                    onReady={editor => {
                        editorRef.current = editor.editing.view;
                    }}
                />
            </div>
            {errors?.bodyContent?.message && errors?.bodyContent.type === 'required' && (
                <div className={'mx-0.5 flex items-center gap-x-1 text-red-500'}>
                    <HiOutlineExclamationTriangle className={'size-5'} />
                    <p className={'text-[0.85rem]'}>{errors.bodyContent.message}</p>
                </div>
            )}
        </div>
    );
}

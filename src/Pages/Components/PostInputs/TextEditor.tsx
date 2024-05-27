import { Controller, useFormContext } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'react-router-dom';

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
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'alignment',
        ],
    },
    language: 'ko',
    image: {
        toolbar: [
            'imageTextAlternative',
            'toggleImageCaption',
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
        ],
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

export default function TextEditor() {
    const {
        control,
        formState: { errors },
    } = useFormContext<FormData>();

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
                                editor={Editor}
                                config={editorConfiguration}
                                onChange={(_, editor) => {
                                    console.log(editor.getData());
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

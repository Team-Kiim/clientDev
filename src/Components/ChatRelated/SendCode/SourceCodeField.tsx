import { useReducer } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface FormData {
    language: string;
    sourceCode: string;
}

export default function SourceCodeField() {
    const [isPreviewMode, toggleIsPreviewMode] = useReducer(state => !state, false);

    const { control, watch } = useFormContext<FormData>();

    const { field } = useController({
        control,
        name: 'sourceCode',
        rules: {
            required: true,
        },
    });

    const currentLanguage = watch(['language'])[0];

    return (
        <div className={'flex flex-col gap-y-2'}>
            <span className={'mx-1 w-fit text-[0.9rem] font-bold'}>
                소스 코드
                <span className={'text-red-500'}>﹡</span>
            </span>
            <div
                className={
                    'relative flex h-[35rem] w-full flex-col gap-y-2 overflow-x-auto overflow-y-auto rounded-lg bg-[#24273a]'
                }
            >
                <div
                    className={
                        'sticky top-0 flex w-full justify-end gap-x-3 bg-[#24273a]/40 px-4 py-2.5 backdrop-blur-md'
                    }
                >
                    <button
                        className={`${!isPreviewMode && 'text-white'} text-[0.9rem] font-bold text-slate-500 transition-all`}
                        type={'button'}
                        onClick={() => {
                            toggleIsPreviewMode();
                        }}
                    >
                        입력
                    </button>
                    <button
                        className={`${isPreviewMode && 'text-white'} text-[0.9rem] font-bold text-slate-500 transition-all`}
                        type={'button'}
                        onClick={() => {
                            toggleIsPreviewMode();
                        }}
                    >
                        미리보기
                    </button>
                </div>
                <div className={'min-h-0 flex-1 overflow-x-auto overflow-y-auto px-3'}>
                    {isPreviewMode ? (
                        <SyntaxHighlighter
                            language={currentLanguage}
                            style={dracula}
                            showLineNumbers={true}
                            customStyle={{
                                padding: 0,
                                backgroundColor: '#24273a',
                                height: '100%',
                                margin: 0,
                                fontSize: '0.9rem',
                            }}
                        >
                            {field.value}
                        </SyntaxHighlighter>
                    ) : (
                        <textarea
                            className={
                                'h-full w-full resize-none overflow-x-auto overflow-y-auto bg-[#24273a] text-[0.9rem] text-white focus:outline-none'
                            }
                            value={field.value}
                            onBlur={field.onBlur}
                            onChange={field.onChange}
                            wrap={'off'}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

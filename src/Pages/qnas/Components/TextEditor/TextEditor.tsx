import { Controller, useFormContext } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import Toolbar, { formats, modules } from '@/Pages/qnas/Components/TextEditor/Toolbar.tsx';
import 'react-quill/dist/quill.snow.css';

interface FormData {
    bodyContent: string;
}

export default function TextEditor() {
    const {
        control,
        formState: { errors },
    } = useFormContext<FormData>();

    return (
        <div>
            <div className={'flex flex-col gap-y-1.5'}>
                <div
                    className={
                        'rounded-md border border-gray-300 focus-within:border-white focus-within:outline focus-within:outline-2 focus-within:outline-violet-600'
                    }
                >
                    <Controller
                        control={control}
                        name={'bodyContent'}
                        rules={{
                            required: {
                                value: true,
                                message: '질문 내용을 입력해주세요.',
                            },
                        }}
                        render={({ field }) => {
                            return (
                                <>
                                    <Toolbar />
                                    <div className={'h-96 overflow-y-auto border-t border-gray-300 transition-all'}>
                                        <ReactQuill
                                            theme={'snow'}
                                            modules={modules}
                                            formats={formats}
                                            defaultValue={field.value}
                                            placeholder={'질문 내용'}
                                            onChange={content => {
                                                if (content.replace(/<(.|n)*?>/g, '').trim().length === 0) {
                                                    field.onChange('');
                                                } else {
                                                    field.onChange(content);
                                                }
                                            }}
                                            onBlur={field.onBlur}
                                        />
                                    </div>
                                </>
                            );
                        }}
                    />
                </div>
                {errors?.bodyContent?.message && errors?.bodyContent.type === 'required' && (
                    <div className={'m-0.5 flex items-center gap-x-1 text-red-700'}>
                        <ExclamationCircleIcon className={'size-5'} />
                        <span className={'text-sm'}>{errors.bodyContent.message}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

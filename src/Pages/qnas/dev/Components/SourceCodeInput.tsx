import { useFormContext } from 'react-hook-form';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface FormData {
    sourceCode?: string;
}

export default function SourceCodeInput() {
    const formMethods = useFormContext<FormData>();

    const { errors } = formMethods.formState;

    return (
        <>
            <div className={'mt-2 flex flex-col gap-y-1.5'}>
                <textarea
                    className={
                        'h-[35rem] w-full resize-none rounded-lg border border-gray-300 p-4 text-[0.9rem] focus:outline-violet-600'
                    }
                    {...formMethods.register('sourceCode', {
                        required: { value: true, message: '소스코드를 입력해주세요.' },
                    })}
                />
                {errors?.sourceCode?.message && errors?.sourceCode.type === 'required' && (
                    <div className={'m-0.5 flex items-center gap-x-1 text-red-700'}>
                        <ExclamationCircleIcon className={'size-5'} />
                        <span className={'text-sm'}>{errors.sourceCode.message}</span>
                    </div>
                )}
            </div>
        </>
    );
}

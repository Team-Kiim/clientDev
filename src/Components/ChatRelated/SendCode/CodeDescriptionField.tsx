import { useFormContext } from 'react-hook-form';

interface FormData {
    codeDescription: string;
}

export default function CodeDescriptionField() {
    const { register } = useFormContext<FormData>();

    return (
        <div className={'flex flex-col gap-y-2'}>
            <label className={'mx-1 w-fit text-[0.9rem] font-bold'}>
                코드 설명
                <span className={'text-red-500'}>﹡</span>
            </label>
            <div
                className={
                    'h-[25rem] w-full rounded-2xl border border-slate-300 transition-all focus-within:border-plump-purple-700'
                }
            >
                <textarea
                    className={'h-full w-full resize-none overflow-y-auto rounded-2xl p-3 text-sm focus:outline-none'}
                    placeholder={'코드에 대해서 설명해주세요.'}
                    {...register('codeDescription', {
                        required: true,
                    })}
                />
            </div>
        </div>
    );
}

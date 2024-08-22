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
            <div className={'h-[30rem] w-full rounded-lg border border-slate-200'}>
                <textarea
                    className={
                        'h-full w-full resize-none overflow-y-auto rounded-lg p-3 text-[0.9rem] focus:outline-none'
                    }
                    placeholder={'코드에 대해서 설명해주세요.'}
                    {...register('codeDescription', {
                        required: true,
                    })}
                />
            </div>
        </div>
    );
}

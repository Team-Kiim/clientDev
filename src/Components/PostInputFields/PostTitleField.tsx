import { useController, useFormContext } from 'react-hook-form';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';

interface FormData {
    title: string;
}

export default function PostTitleField() {
    const formMethods = useFormContext<FormData>();

    const { field } = useController({
        name: 'title',
        control: formMethods.control,
        rules: {
            required: {
                value: true,
                message: '제목을 입력해주세요.',
            },
            maxLength: {
                value: 100,
                message: '최대 100자까지 입력할 수 있어요.',
            },
        },
    });

    const { errors } = formMethods.formState;

    return (
        <div className={'flex flex-col gap-y-2'}>
            <label className={'mx-1 w-fit text-[0.9rem] font-bold'} htmlFor={'postTitleInput'}>
                제목
                <span className={'text-red-500'}>﹡</span>
            </label>
            <div
                className={
                    'flex items-center justify-between gap-x-2 rounded-lg border border-slate-300 px-3.5 py-2.5 transition-all focus-within:border-violet-700'
                }
            >
                <input
                    id={'postTitleInput'}
                    className={'flex-1 text-[0.95rem] placeholder:text-slate-400 focus:outline-none'}
                    value={field.value}
                    type={'text'}
                    placeholder={'제목을 입력해주세요.'}
                    autoComplete={'off'}
                    autoCapitalize={'off'}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    ref={formMethods.register('title').ref}
                />
                <div className={'text-[0.85rem] font-bold text-slate-400'}>
                    <span>{field.value.length} / 100</span>
                </div>
            </div>
            {errors?.title?.message && errors?.title.type === 'required' && (
                <div className={'mx-0.5 flex items-center gap-x-1 text-red-500'}>
                    <HiOutlineExclamationTriangle className={'size-4'} />
                    <p className={'text-[0.85rem]'}>{errors.title.message}</p>
                </div>
            )}
            {errors?.title?.message && errors?.title.type === 'maxLength' && (
                <div className={'mx-0.5 flex items-center gap-x-1 text-red-500'}>
                    <HiOutlineExclamationTriangle className={'size-5'} />
                    <p className={'text-[0.85rem]'}>{errors.title.message}</p>
                </div>
            )}
        </div>
    );
}

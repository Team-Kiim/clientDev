import { Controller, useFormContext } from 'react-hook-form';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface FormData {
    title: string;
}

export default function TitleInput() {
    const formMethods = useFormContext<FormData>();

    const { errors } = formMethods.formState;

    return (
        <div className={'flex flex-col gap-y-1.5'}>
            <div>
                <Controller
                    control={formMethods.control}
                    name={'title'}
                    rules={{
                        required: { value: true, message: '제목을 입력해주세요.' },
                        maxLength: { value: 100, message: '최대 100자까지 입력할 수 있어요.' },
                    }}
                    render={({ field }) => {
                        return (
                            <div className={'flex items-center gap-x-3'}>
                                <input
                                    className={
                                        'flex-1 py-2 text-[1.7rem] font-bold placeholder:text-gray-400 focus:outline-none'
                                    }
                                    value={field.value}
                                    type={'text'}
                                    placeholder={'제목을 입력해주세요.'}
                                    autoComplete={'off'}
                                    autoCapitalize={'off'}
                                    onBlur={field.onBlur}
                                    onChange={field.onChange}
                                />
                                <div className={'text-[0.95rem] text-gray-600'}>
                                    <span>{`${field.value.length} / 100`}</span>
                                </div>
                            </div>
                        );
                    }}
                />
            </div>
            {errors?.title?.message && errors?.title.type === 'required' && (
                <div className={'m-0.5 flex items-center gap-x-1 text-red-700'}>
                    <ExclamationTriangleIcon className={'size-5'} />
                    <p className={'text-sm font-bold'}>{errors.title.message}</p>
                </div>
            )}
            {errors?.title?.message && errors?.title.type === 'maxLength' && (
                <div className={'m-0.5 flex items-center gap-x-1 text-red-700'}>
                    <ExclamationTriangleIcon className={'size-5'} />
                    <p className={'text-sm font-bold'}>{errors.title.message}</p>
                </div>
            )}
        </div>
    );
}

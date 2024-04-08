import { useFormContext } from 'react-hook-form';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface FormData {
    title: string;
}

export default function TitleInput() {
    const formMethods = useFormContext<FormData>();

    const { errors } = formMethods.formState;

    return (
        <div>
            <div className={'flex flex-col gap-y-1.5'}>
                <input
                    className={
                        'rounded-md border border-gray-300 px-3.5 py-2 placeholder:text-base focus:outline-violet-600'
                    }
                    type={'text'}
                    placeholder={'제목 (100자 이내)'}
                    autoComplete={'off'}
                    autoCapitalize={'off'}
                    {...formMethods.register('title', {
                        required: { value: true, message: '제목을 입력해주세요.' },
                        maxLength: { value: 100, message: '100자 이하로 입력해주세요.' },
                    })}
                />
                {errors?.title?.message && errors?.title.type === 'required' && (
                    <div className={'m-0.5 flex items-center gap-x-1 text-red-700'}>
                        <ExclamationCircleIcon className={'size-5'} />
                        <span className={'text-sm'}>{errors.title.message}</span>
                    </div>
                )}
                {errors?.title?.message && errors?.title.type === 'maxLength' && (
                    <div className={'m-0.5 flex items-center gap-x-1 text-red-700'}>
                        <ExclamationCircleIcon className={'size-5'} />
                        <span className={'text-sm'}>{errors.title.message}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

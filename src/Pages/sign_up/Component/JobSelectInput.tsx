import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface FormData {
    job: string;
}

const jobOptions = [
    { value: 'COMPANY_EMPLOYEE', label: '현직자' },
    { value: 'FREELANCER', label: '프리랜서' },
    { value: 'STUDENT', label: '학생' },
    { value: 'GENERAL', label: '일반' },
];

export default function JobSelectInput() {
    const {
        control,
        formState: { errors },
    } = useFormContext<FormData>();

    return (
        <div className={'flex w-full flex-col gap-y-2'}>
            <label className={'mx-2 w-fit text-[0.9rem] font-bold'} htmlFor={'jobSelectInput'}>
                직업
            </label>
            <Controller
                control={control}
                name={'job'}
                rules={{
                    validate: {
                        isNotSelected(value) {
                            return value.length !== 0 || '직업을 선택해주세요.';
                        },
                    },
                }}
                render={({ field }) => {
                    return (
                        <Select
                            inputId={'jobSelectInput'}
                            placeholder={'직업 선택'}
                            options={jobOptions}
                            onChange={option => field.onChange(option.value)}
                            onBlur={field.onBlur}
                            classNames={{
                                control({ isFocused }) {
                                    return `!rounded-md !h-[47.59px] !border !border-gray-300 !bg-white !border !text-[0.9rem] !shadow-none ${isFocused ? '!border-violet-700' : '!border-gray-300'}`;
                                },

                                option() {
                                    return '!text-[0.9rem]';
                                },
                            }}
                        />
                    );
                }}
            />
            {errors?.job?.message && errors?.job.type === 'isNotSelected' && (
                <div className={'m-0.5 flex items-center gap-x-1 text-red-700'}>
                    <ExclamationTriangleIcon className={'size-5'} />
                    <p className={'text-[0.8rem] font-bold'}>{errors.job.message}</p>
                </div>
            )}
        </div>
    );
}

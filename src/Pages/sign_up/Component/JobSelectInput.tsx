import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';
import { HiOutlineExclamationTriangle, HiOutlineIdentification } from 'react-icons/hi2';

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
            <div
                className={
                    'flex h-[54px] items-center gap-x-2 rounded-xl border border-slate-300 px-2 py-3.5 focus-within:border-violet-700'
                }
            >
                <HiOutlineIdentification className={'size-6 text-slate-500'} />
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
                                placeholder={'직업'}
                                options={jobOptions}
                                onChange={option => field.onChange(option.value)}
                                onBlur={field.onBlur}
                                styles={{
                                    container: base => {
                                        return {
                                            ...base,
                                            flex: 1,
                                        };
                                    },
                                    valueContainer: base => {
                                        return {
                                            ...base,
                                            padding: 0,
                                        };
                                    },

                                    placeholder: base => {
                                        return {
                                            ...base,
                                            color: '#9ca3af',
                                        };
                                    },
                                }}
                                classNames={{
                                    control() {
                                        return `!bg-white !text-[0.9rem] !border-none !shadow-none`;
                                    },

                                    option() {
                                        return '!text-[0.9rem]';
                                    },
                                }}
                            />
                        );
                    }}
                />
            </div>
            {errors?.job?.message && errors?.job.type === 'isNotSelected' && (
                <div className={'m-0.5 flex items-center gap-x-1 text-red-500'}>
                    <HiOutlineExclamationTriangle className={'size-5'} />
                    <p className={'text-[0.8rem]'}>{errors.job.message}</p>
                </div>
            )}
        </div>
    );
}

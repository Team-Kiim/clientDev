import axios from 'axios';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Select from 'react-select';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';

interface Props {
    closeModal(): void;
    profileData: {
        nickname: string;
        job: string;
    };
}

interface FormData {
    nickname: string;
    job: string;
}

const jobOptions = [
    { value: 'COMPANY_EMPLOYEE', label: '현직자' },
    { value: 'FREELANCER', label: '프리랜서' },
    { value: 'STUDENT', label: '학생' },
    { value: 'GENERAL', label: '일반' },
];

export default function ProfileUpdateForm({ closeModal, profileData }: Props) {
    const queryClient = useQueryClient();

    const {
        control,
        formState: { errors, isSubmitting },
        handleSubmit,
        register,
    } = useForm<FormData>({
        mode: 'onBlur',
        defaultValues: {
            nickname: profileData.nickname,
            job: profileData.job ?? '',
        },
    });

    const { mutate: profileUpdateMutate } = useMutation({
        mutationFn: ({ nickname, memberRole }: { nickname: string; memberRole: string }) => {
            return axios.patch('/api/member/profile', { nickname, memberRole });
        },

        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: ['user'],
            });
        },

        onError: () => {
            //TODO
            // 에러처리
        },

        onSettled: () => {
            closeModal();
        },
    });

    const onSubmit: SubmitHandler<FormData> = async data => {
        const nickname = data.nickname.trim();
        const memberRole = data.job;
        profileUpdateMutate({ nickname, memberRole });
    };

    return (
        <form className={'flex flex-col gap-y-12'} onSubmit={handleSubmit(onSubmit)}>
            <div className={'flex flex-col gap-y-5'}>
                <div className={'flex w-full flex-col gap-y-2'}>
                    <label className={'mx-1.5 w-fit text-[0.9rem] font-bold'} htmlFor={'nicknameInput'}>
                        닉네임
                    </label>
                    <div
                        className={
                            'flex items-center rounded-xl border border-slate-300 p-3 focus-within:border-violet-700'
                        }
                    >
                        <input
                            id={'nicknameInput'}
                            className={'w-full flex-1 text-[0.9rem] focus:outline-none'}
                            type={'text'}
                            placeholder={'닉네임 (최대 20자)'}
                            autoComplete={'off'}
                            autoCapitalize={'off'}
                            {...register('nickname', {
                                required: {
                                    value: true,
                                    message: '닉네임을 입력해주세요.',
                                },
                                maxLength: {
                                    value: 20,
                                    message: '최대 20자까지 입력 가능합니다.',
                                },
                            })}
                        />
                    </div>
                    {errors?.nickname?.message && errors?.nickname.type === 'required' && (
                        <div className={'m-0.5 flex items-center gap-x-1 text-red-500'}>
                            <HiOutlineExclamationTriangle className={'size-5'} />
                            <p className={'text-[0.8rem]'}>{errors.nickname.message}</p>
                        </div>
                    )}
                    {errors?.nickname?.message && errors?.nickname.type === 'maxLength' && (
                        <div className={'m-0.5 flex items-center gap-x-1 text-red-500'}>
                            <HiOutlineExclamationTriangle className={'size-5'} />
                            <p className={'text-[0.8rem] font-bold'}>{errors.nickname.message}</p>
                        </div>
                    )}
                </div>
                <div className={'flex w-full flex-col gap-y-2'}>
                    <label className={'mx-1.5 w-fit text-[0.9rem] font-bold'} htmlFor={'jobSelectInput'}>
                        직업
                    </label>
                    <div
                        className={
                            'flex h-[47.59px] items-center rounded-xl border border-slate-300 px-3 focus-within:border-violet-700'
                        }
                    >
                        <Controller
                            control={control}
                            name={'job'}
                            rules={{
                                validate: {
                                    isNotSelected(value) {
                                        return value !== 'TEMP' || '직업을 선택해주세요.';
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
                                        defaultValue={jobOptions.find(option => option.value === field.value)}
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
            </div>
            <div className={'mb-1.5 flex justify-end gap-x-3'}>
                <button
                    className={
                        'rounded-lg bg-slate-100 px-4 py-2.5 text-[0.9rem] font-bold transition-all hover:bg-slate-200 disabled:cursor-default disabled:opacity-75'
                    }
                    type={'button'}
                    onClick={closeModal}
                    disabled={isSubmitting}
                >
                    취소
                </button>
                <button
                    className={
                        'rounded-lg bg-violet-600 px-4 py-2.5 text-[0.9rem] font-bold text-white transition-all hover:bg-violet-700 disabled:cursor-default disabled:opacity-75'
                    }
                    disabled={isSubmitting}
                >
                    수정
                </button>
            </div>
        </form>
    );
}

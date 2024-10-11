import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HiOutlineExclamationCircle } from 'react-icons/hi2';
import { MdCorporateFare, MdDomain } from 'react-icons/md';
import { toast } from 'react-toastify';
import TOAST_OPTIONS from '@/Constants/toastOptions.ts';
import 'react-toastify/dist/ReactToastify.css';

interface FormValues {
    corpName: string;
    corpEmailDomain: string;
}

interface Props {
    closeModal(): void;
}

export default function RequestToAddDomainForm({ closeModal }: Props) {
    const {
        formState: { errors },
        handleSubmit,
        register,
    } = useForm<FormValues>({
        mode: 'onBlur',
        defaultValues: { corpName: '', corpEmailDomain: '' },
    });

    const { mutate: requestToAddDomain } = useMutation({
        mutationFn: ({ name, emailDomain }: { name: string; emailDomain: string }) => {
            return axios.post('/api/corps', {
                name,
                emailDomain,
            });
        },

        onSuccess: () => {
            closeModal();
            toast.success(
                <p className={'text-[0.85rem] leading-relaxed'}>
                    도메인 추가 요청이 완료되었습니다.
                    <br />
                    요청 결과는 알림을 통해 확인해주세요.
                </p>,
                TOAST_OPTIONS,
            );
        },

        onError: (error: AxiosError) => {
            console.error(error);
            toast.error(<p className={'text-[0.85rem]'}>도메인 추가 요청을 할 수 없습니다.</p>, {
                ...TOAST_OPTIONS,
                position: 'top-center',
            });
        },
    });

    const onSubmit: SubmitHandler<FormValues> = data => {
        const corpName = data.corpName.replace(/\s/gi, '');
        const corpEmailDomain = data.corpEmailDomain.replace(/\s/g, '');

        requestToAddDomain({
            name: corpName,
            emailDomain: corpEmailDomain,
        });
    };

    return (
        <form className={'flex w-full flex-col gap-y-10'} onSubmit={handleSubmit(onSubmit)}>
            <div className={'flex flex-col gap-y-6'}>
                <div className={'flex flex-col gap-y-2'}>
                    <label className={'mx-2 w-fit text-[0.9rem] font-bold text-slate-800'} htmlFor={'corpNameInput'}>
                        회사 이름
                        <span className={'text-rose-500'}>﹡</span>
                    </label>
                    <div
                        className={
                            'flex w-full items-center gap-x-2 rounded-2xl border border-slate-300 px-3 py-3.5 transition-all focus-within:border-plump-purple-600'
                        }
                    >
                        <MdCorporateFare className={'size-5 text-slate-800'} />
                        <input
                            id={'corpNameInput'}
                            type={'text'}
                            className={
                                'flex-1 text-[0.9rem] placeholder:text-slate-400 focus:outline-none disabled:bg-white disabled:opacity-50'
                            }
                            placeholder={'회사 이름'}
                            autoComplete={'off'}
                            autoCapitalize={'off'}
                            {...register('corpName', {
                                required: { value: true, message: '회사 이름을 입력해주세요.' },
                            })}
                        />
                    </div>
                    {errors?.corpName?.message && errors?.corpName.type === 'required' && (
                        <div className={'mx-1 flex items-center gap-x-1 text-rose-500'}>
                            <HiOutlineExclamationCircle className={'size-4'} />
                            <p className={'text-[0.8rem]'}>{errors.corpName.message}</p>
                        </div>
                    )}
                </div>
                <div className={'flex flex-col gap-y-2'}>
                    <label
                        className={'mx-2 w-fit text-[0.9rem] font-bold text-slate-800'}
                        htmlFor={'corpEmailDomainInput'}
                    >
                        도메인
                        <span className={'text-rose-500'}>﹡</span>
                    </label>
                    <div
                        className={
                            'flex w-full items-center gap-x-2 rounded-2xl border border-slate-300 px-3 py-3.5 transition-all focus-within:border-plump-purple-600'
                        }
                    >
                        <MdDomain className={'size-5 text-slate-800'} />
                        <input
                            id={'corpNameInput'}
                            type={'text'}
                            className={
                                'flex-1 text-[0.9rem] placeholder:text-slate-400 focus:outline-none disabled:bg-white disabled:opacity-50'
                            }
                            placeholder={'도메인'}
                            autoComplete={'off'}
                            autoCapitalize={'off'}
                            {...register('corpEmailDomain', {
                                required: { value: true, message: '도메인을 입력해주세요.' },
                                pattern: {
                                    value: /^((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/,
                                    message: '유효한 값을 입력해주세요.',
                                },
                            })}
                        />
                    </div>
                    {errors?.corpEmailDomain?.message && errors?.corpEmailDomain.type === 'required' && (
                        <div className={'mx-1 flex items-center gap-x-1 text-rose-500'}>
                            <HiOutlineExclamationCircle className={'size-4'} />
                            <p className={'text-[0.8rem]'}>{errors.corpEmailDomain.message}</p>
                        </div>
                    )}
                    {errors?.corpEmailDomain?.message && errors?.corpEmailDomain.type === 'pattern' && (
                        <div className={'mx-1 flex items-center gap-x-1 text-rose-500'}>
                            <HiOutlineExclamationCircle className={'size-4'} />
                            <p className={'text-[0.8rem]'}>{errors.corpEmailDomain.message}</p>
                        </div>
                    )}
                </div>
                <div className={'flex justify-end gap-x-3.5'}>
                    <button
                        className={
                            'rounded-lg bg-slate-100 px-4 py-2.5 text-[0.9rem] font-bold transition-all hover:bg-slate-200 disabled:cursor-default disabled:opacity-75'
                        }
                        type={'button'}
                        onClick={() => {
                            closeModal();
                        }}
                    >
                        취소
                    </button>
                    <button
                        className={
                            'rounded-lg bg-gradient-to-r from-plump-purple-600 to-rose-500 px-4 py-2.5 text-[0.9rem] font-bold text-white transition-all hover:opacity-90'
                        }
                    >
                        추가 요청
                    </button>
                </div>
            </div>
        </form>
    );
}

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ExclamationTriangleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface FormData {
    email: string;
    password: string;
}

export default function SignInForm() {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const onSubmit: SubmitHandler<FormData> = async data => {
        console.log(data);
        console.log(data.email.replace(/\s/gi, ''));
        console.log(data.password.replace(/\s/gi, ''));
    };

    return (
        <form className={'flex w-full flex-col gap-y-8'} onSubmit={handleSubmit(onSubmit)}>
            <div className={'flex w-full flex-col gap-y-7'}>
                <div className={'flex w-full flex-col gap-y-1.5'}>
                    <input
                        className={
                            'w-full rounded-lg border border-gray-300 px-3.5 py-3 text-[0.93rem] focus:outline-violet-700'
                        }
                        type={'text'}
                        placeholder={'이메일'}
                        autoComplete={'off'}
                        autoCapitalize={'off'}
                        {...register('email', {
                            required: { value: true, message: '이메일을 입력해주세요.' },
                        })}
                    />
                    {errors?.email?.message && errors?.email.type === 'required' && (
                        <div className={'m-0.5 flex items-center gap-x-1 text-red-700'}>
                            <ExclamationTriangleIcon className={'size-5'} />
                            <p className={'text-sm'}>{errors.email.message}</p>
                        </div>
                    )}
                </div>
                <div className={'flex w-full flex-col gap-y-1.5'}>
                    <div
                        className={
                            'flex rounded-lg border border-gray-300 px-3.5 py-3 text-[0.93rem] focus-within:border-white focus-within:outline focus-within:outline-2 focus-within:outline-offset-[-2px] focus-within:outline-violet-700'
                        }
                    >
                        <input
                            className={'w-full flex-1 focus:outline-none'}
                            type={isPasswordVisible ? 'text' : 'password'}
                            placeholder={'비밀번호'}
                            autoComplete={'off'}
                            autoCapitalize={'off'}
                            {...register('password', {
                                required: {
                                    value: true,
                                    message: '비밀번호를 입력해주세요.',
                                },
                            })}
                        />
                        <button
                            type={'button'}
                            onMouseDown={() => {
                                setIsPasswordVisible(!isPasswordVisible);
                            }}
                        >
                            {isPasswordVisible ? (
                                <EyeSlashIcon className={'size-5'} />
                            ) : (
                                <EyeIcon className={'size-5'} />
                            )}
                        </button>
                    </div>
                    {errors?.password?.message && errors?.password.type === 'required' && (
                        <div className={'m-0.5 flex items-center gap-x-1 text-red-700'}>
                            <ExclamationTriangleIcon className={'size-5'} />
                            <p className={'text-sm'}>{errors.password.message}</p>
                        </div>
                    )}
                </div>
            </div>
            <button
                className={
                    'flex w-full items-center justify-center rounded-lg bg-violet-600 py-3 transition-all hover:bg-violet-700 disabled:opacity-50'
                }
                type={'submit'}
                disabled={isSubmitting}
            >
                <span className={'font-bold text-white'}>로그인</span>
            </button>
        </form>
    );
}

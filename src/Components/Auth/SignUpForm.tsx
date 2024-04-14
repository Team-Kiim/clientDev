import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ExclamationCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { emailRegexp, passwordRegexp } from '@/Constants/regexps.ts';

interface FormData {
    email: string;
    password: string;
    nickname: string;
}

export default function SignUpForm() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormData>({
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
            nickname: '',
        },
    });

    console.log(errors);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const onSubmit: SubmitHandler<FormData> = data => {
        console.log(data);
    };

    return (
        <form className={'flex w-full flex-col gap-y-8'} onSubmit={handleSubmit(onSubmit)}>
            <div className={'flex w-full flex-col gap-y-4'}>
                <div className={'flex w-full flex-col gap-y-1.5'}>
                    <input
                        className={
                            'w-full rounded-md border border-gray-300 px-3.5 py-3 placeholder:text-[0.9rem] focus:outline-violet-600'
                        }
                        type={'text'}
                        placeholder={'이메일'}
                        autoComplete={'off'}
                        autoCapitalize={'off'}
                        {...register('email', {
                            required: { value: true, message: '이메일을 입력해주세요.' },
                            pattern: { value: emailRegexp, message: '유효한 이메일 주소를 입력해주세요.' },
                        })}
                    />
                    {errors?.email?.message && errors?.email.type === 'required' && (
                        <div className={'m-0.5 flex items-center gap-x-1 text-red-700'}>
                            <ExclamationCircleIcon className={'size-5'} />
                            <p className={'text-sm'}>{errors.email.message}</p>
                        </div>
                    )}
                    {errors?.email?.message && errors?.email.type === 'pattern' && (
                        <div className={'m-0.5 flex items-center gap-x-1 text-red-700'}>
                            <ExclamationCircleIcon className={'size-5'} />
                            <p className={'text-sm'}>{errors.email.message}</p>
                        </div>
                    )}
                </div>
                <div className={'flex w-full flex-col gap-y-1.5'}>
                    <div
                        className={
                            'flex rounded-md border border-gray-300 px-3.5 py-3 focus-within:border-white focus-within:outline focus-within:outline-2 focus-within:outline-offset-[-2px] focus-within:outline-violet-600'
                        }
                    >
                        <input
                            className={'w-full flex-1 placeholder:text-[0.9rem] focus:outline-none'}
                            type={isPasswordVisible ? 'text' : 'password'}
                            placeholder={'비밀번호 (7~20자의 알파벳, 숫자, 특수문자 포함)'}
                            autoComplete={'off'}
                            autoCapitalize={'off'}
                            {...register('password', {
                                required: { value: true, message: '비밀번호를 입력해주세요.' },
                                pattern: {
                                    value: passwordRegexp,
                                    message: '7~20자의 알파벳, 숫자, 특수문자를 포함해야 합니다.',
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
                            <ExclamationCircleIcon className={'size-5'} />
                            <p className={'text-sm'}>{errors.password.message}</p>
                        </div>
                    )}
                    {errors?.password?.message && errors?.password.type === 'pattern' && (
                        <div className={'m-0.5 flex items-center gap-x-1 text-red-700'}>
                            <ExclamationCircleIcon className={'size-5'} />
                            <p className={'text-sm'}>{errors.password.message}</p>
                        </div>
                    )}
                </div>
                <div className={'flex w-full flex-col gap-y-1.5'}>
                    <input
                        className={
                            'w-full rounded-md border border-gray-300 px-3.5 py-3 placeholder:text-[0.9rem] focus:outline-violet-600'
                        }
                        type={'text'}
                        placeholder={'닉네임'}
                        autoComplete={'off'}
                        autoCapitalize={'off'}
                        {...register('nickname', {
                            required: { value: true, message: '닉네임을 입력해주세요.' },
                            maxLength: { value: 20, message: '최대 20자까지 입력 가능합니다.' },
                        })}
                    />
                    {errors?.nickname?.message && errors?.nickname.type === 'maxLength' && (
                        <div className={'m-0.5 flex items-center gap-x-1 text-red-700'}>
                            <ExclamationCircleIcon className={'size-5'} />
                            <p className={'text-sm'}>{errors.nickname.message}</p>
                        </div>
                    )}
                    {errors?.nickname?.message && errors?.nickname.type === 'required' && (
                        <div className={'m-0.5 flex items-center gap-x-1 text-red-700'}>
                            <ExclamationCircleIcon className={'size-5'} />
                            <p className={'text-sm'}>{errors.nickname.message}</p>
                        </div>
                    )}
                </div>
            </div>
            <button
                className={
                    'flex w-full items-center justify-center rounded-md bg-violet-600 py-3 transition-all hover:bg-violet-700'
                }
                type={'submit'}
            >
                <span className={'text-[0.9rem] font-medium text-white'}>회원가입</span>
            </button>
        </form>
    );
}

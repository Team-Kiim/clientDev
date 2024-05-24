import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ExclamationTriangleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { passwordRegexp } from '@/Constants/regexps.ts';

interface FormData {
    password: string;
    confirmPassword: string;
}

export default function PasswordInputs() {
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const {
        register,
        getValues,
        formState: { errors },
    } = useFormContext<FormData>();

    return (
        <>
            <div className={'flex w-full flex-col gap-y-2'}>
                <label className={'mx-2 w-fit text-[0.9rem] font-bold'} htmlFor={'passwordInput'}>
                    비밀번호
                </label>
                <div
                    className={
                        'flex items-center rounded-md border border-gray-300 px-3.5 py-3 focus-within:border-violet-700'
                    }
                >
                    <input
                        id={'passwordInput'}
                        className={'w-full flex-1 text-[0.9rem] focus:outline-none'}
                        placeholder={'7~20자의 알파벳, 숫자, 특수문자 포함'}
                        type={isPasswordVisible ? 'text' : 'password'}
                        autoComplete={'off'}
                        autoCapitalize={'off'}
                        {...register('password', {
                            required: {
                                value: true,
                                message: '비밀번호를 입력해주세요.',
                            },
                            pattern: {
                                value: passwordRegexp,
                                message: '7~20자의 알파벳, 숫자, 특수문자를 포함해야 합니다.',
                            },
                        })}
                    />
                    <button
                        type={'button'}
                        onMouseDown={() => {
                            setPasswordVisible(!isPasswordVisible);
                        }}
                    >
                        {isPasswordVisible ? (
                            <EyeSlashIcon className={'size-5 scale-110'} />
                        ) : (
                            <EyeIcon className={'size-5 scale-110'} />
                        )}
                    </button>
                </div>
                {errors?.password?.message && errors?.password.type === 'required' && (
                    <div className={'m-0.5 flex items-center gap-x-1 text-red-700 '}>
                        <ExclamationTriangleIcon className={'size-5'} />
                        <p className={'text-[0.8rem] font-bold'}>{errors.password.message}</p>
                    </div>
                )}
                {errors?.password?.message && errors?.password.type === 'pattern' && (
                    <div className={'m-0.5 flex items-center gap-x-1 text-red-700 '}>
                        <ExclamationTriangleIcon className={'size-5'} />
                        <p className={'text-[0.8rem] font-bold'}>{errors.password.message}</p>
                    </div>
                )}
            </div>
            <div className={'flex w-full flex-col gap-y-2'}>
                <label className={'mx-2 w-fit text-[0.9rem] font-bold'} htmlFor={'confirmPasswordInput'}>
                    비밀번호 확인
                </label>
                <div
                    className={
                        'flex items-center rounded-md border border-gray-300 px-3.5 py-3 focus-within:border-violet-700'
                    }
                >
                    <input
                        id={'confirmPasswordInput'}
                        className={'w-full text-[0.9rem] focus:outline-none'}
                        placeholder={'위와 동일한 비밀번호'}
                        type={'password'}
                        autoComplete={'off'}
                        autoCapitalize={'off'}
                        {...register('confirmPassword', {
                            required: {
                                value: true,
                                message: '비밀번호를 입력해주세요.',
                            },
                            validate: {
                                isNotMatched(value) {
                                    const password = getValues().password;
                                    return password === value || '위에서 입력한 비밀번호와 일치하지 않습니다.';
                                },
                            },
                        })}
                    />
                </div>
                {errors?.confirmPassword?.message && errors?.confirmPassword.type === 'required' && (
                    <div className={'m-0.5 flex items-center gap-x-1 text-red-700 '}>
                        <ExclamationTriangleIcon className={'size-5'} />
                        <p className={'text-[0.8rem] font-bold'}>{errors.confirmPassword.message}</p>
                    </div>
                )}
                {errors?.confirmPassword?.message && errors?.confirmPassword.type === 'isNotMatched' && (
                    <div className={'m-0.5 flex items-center gap-x-1 text-red-700 '}>
                        <ExclamationTriangleIcon className={'size-5'} />
                        <p className={'text-[0.8rem] font-bold'}>{errors.confirmPassword.message}</p>
                    </div>
                )}
            </div>
        </>
    );
}

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { HiOutlineEye, HiOutlineEyeSlash, HiOutlineLockClosed, HiOutlineExclamationTriangle } from 'react-icons/hi2';
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
        <div className={'flex flex-col gap-y-5'}>
            <div className={'flex w-full flex-col gap-y-2'}>
                <div
                    className={
                        'flex items-center gap-x-2 rounded-xl border border-slate-300 px-2 py-3.5 focus-within:border-violet-700'
                    }
                >
                    <HiOutlineLockClosed className={'size-6 text-slate-500'} />
                    <input
                        className={
                            'w-full flex-1 text-[0.9rem] focus:outline-none disabled:bg-white disabled:opacity-75'
                        }
                        placeholder={'비밀번호'}
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
                            <HiOutlineEyeSlash className={'size-6 text-slate-500'} />
                        ) : (
                            <HiOutlineEye className={'size-6 text-slate-500'} />
                        )}
                    </button>
                </div>
                {errors?.password?.message && errors?.password.type === 'required' && (
                    <div className={'m-0.5 flex items-center gap-x-1 text-red-500 '}>
                        <HiOutlineExclamationTriangle className={'size-5'} />
                        <p className={'text-[0.8rem]'}>{errors.password.message}</p>
                    </div>
                )}
                {errors?.password?.message && errors?.password.type === 'pattern' && (
                    <div className={'m-0.5 flex items-center gap-x-1 text-red-500 '}>
                        <HiOutlineExclamationTriangle className={'size-5'} />
                        <p className={'text-[0.8rem]'}>{errors.password.message}</p>
                    </div>
                )}
            </div>
            <div className={'flex w-full flex-col gap-y-2'}>
                <div
                    className={
                        'flex items-center gap-x-2 rounded-xl border border-slate-300 px-2 py-3.5 focus-within:border-violet-700'
                    }
                >
                    <HiOutlineLockClosed className={'size-6 text-slate-500'} />
                    <input
                        className={
                            'w-full flex-1 text-[0.9rem] focus:outline-none disabled:bg-white disabled:opacity-75'
                        }
                        placeholder={'비밀번호 확인'}
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
                    <div className={'m-0.5 flex items-center gap-x-1 text-red-500 '}>
                        <HiOutlineExclamationTriangle className={'size-5'} />
                        <p className={'text-[0.8rem]'}>{errors.confirmPassword.message}</p>
                    </div>
                )}
                {errors?.confirmPassword?.message && errors?.confirmPassword.type === 'isNotMatched' && (
                    <div className={'m-0.5 flex items-center gap-x-1 text-red-500 '}>
                        <HiOutlineExclamationTriangle className={'size-5'} />
                        <p className={'text-[0.8rem]'}>{errors.confirmPassword.message}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

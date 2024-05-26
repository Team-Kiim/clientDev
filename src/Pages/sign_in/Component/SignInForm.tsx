import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ExclamationTriangleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface FormData {
    email: string;
    password: string;
}

export default function SignInForm() {
    const navigate = useNavigate();

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
        const email = data.email.replace(/\s/gi, '');
        const password = data.password.replace(/\s/gi, '');

        try {
            await axios.post('/api/auth/login', {
                email,
                password,
            });
            navigate('/');
        } catch (error) {
            //TODO
            // 에러 처리
        }
    };

    return (
        <form className={'flex w-full flex-col gap-y-8'} onSubmit={handleSubmit(onSubmit)}>
            <div className={'flex w-full flex-col gap-y-7'}>
                <div className={'flex w-full flex-col gap-y-2'}>
                    <label className={'mx-2 w-fit text-[0.9rem] font-bold'} htmlFor={'emailInput'}>
                        이메일
                    </label>
                    <div
                        className={
                            'flex items-center rounded-md border border-gray-300 px-3.5 py-3 focus-within:border-violet-700'
                        }
                    >
                        <input
                            id={'emailInput'}
                            className={'w-full text-[0.9rem] focus:outline-none'}
                            type={'text'}
                            placeholder={'가입한 이메일 주소 입력'}
                            autoComplete={'off'}
                            autoCapitalize={'off'}
                            {...register('email', {
                                required: { value: true, message: '이메일을 입력해주세요.' },
                            })}
                        />
                    </div>
                    {errors?.email?.message && errors?.email.type === 'required' && (
                        <div className={'m-0.5 flex items-center gap-x-1 text-red-700'}>
                            <ExclamationTriangleIcon className={'size-5'} />
                            <p className={'text-[0.8rem] font-bold'}>{errors.email.message}</p>
                        </div>
                    )}
                </div>
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
                            type={isPasswordVisible ? 'text' : 'password'}
                            placeholder={'비밀번호 입력'}
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
                                <EyeSlashIcon className={'size-5 scale-110'} />
                            ) : (
                                <EyeIcon className={'size-5 scale-110'} />
                            )}
                        </button>
                    </div>
                    {errors?.password?.message && errors?.password.type === 'required' && (
                        <div className={'m-0.5 flex items-center gap-x-1 text-red-700'}>
                            <ExclamationTriangleIcon className={'size-5'} />
                            <p className={'text-[0.8rem] font-bold'}>{errors.password.message}</p>
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

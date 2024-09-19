import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
    HiOutlineEye,
    HiOutlineEnvelope,
    HiOutlineEyeSlash,
    HiOutlineLockClosed,
    HiOutlineExclamationCircle,
} from 'react-icons/hi2';

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
        <form className={'flex w-full flex-col gap-y-10'} onSubmit={handleSubmit(onSubmit)}>
            <div className={'flex w-full flex-col gap-y-5'}>
                <div className={'flex w-full flex-col gap-y-2'}>
                    <div
                        className={
                            'flex items-center gap-x-2 rounded-2xl border border-slate-300 px-3 py-3.5 transition-all focus-within:border-plump-purple-600'
                        }
                    >
                        <HiOutlineEnvelope className={'size-5 text-slate-800'} />
                        <input
                            className={'flex-1 text-[0.9rem] placeholder:text-slate-400 focus:outline-none'}
                            type={'text'}
                            placeholder={'이메일'}
                            autoComplete={'off'}
                            autoCapitalize={'off'}
                            {...register('email', {
                                required: { value: true, message: '이메일을 입력해주세요.' },
                            })}
                        />
                    </div>
                    {errors?.email?.message && errors?.email.type === 'required' && (
                        <div className={'m-0.5 flex items-center gap-x-1 text-rose-600'}>
                            <HiOutlineExclamationCircle className={'size-5'} />
                            <p className={'text-[0.8rem]'}>{errors.email.message}</p>
                        </div>
                    )}
                </div>
                <div className={'flex w-full flex-col gap-y-2'}>
                    <div
                        className={
                            'flex items-center gap-x-2 rounded-2xl border border-slate-300 px-3 py-3.5 transition-all focus-within:border-plump-purple-600'
                        }
                    >
                        <HiOutlineLockClosed className={'size-5 text-slate-800'} />
                        <input
                            className={'w-full flex-1 text-[0.9rem] placeholder:text-slate-400 focus:outline-none'}
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
                                <HiOutlineEyeSlash className={'size-5 text-slate-800'} />
                            ) : (
                                <HiOutlineEye className={'size-5 text-slate-800'} />
                            )}
                        </button>
                    </div>
                    {errors?.password?.message && errors?.password.type === 'required' && (
                        <div className={'m-0.5 flex items-center gap-x-1 text-rose-500'}>
                            <HiOutlineExclamationCircle className={'size-5'} />
                            <p className={'text-[0.8rem]'}>{errors.password.message}</p>
                        </div>
                    )}
                </div>
            </div>
            <button
                className={
                    'flex w-full items-center justify-center rounded-2xl bg-plump-purple-600 py-3.5 text-[0.9rem] transition-all hover:bg-violet-600 disabled:opacity-50'
                }
                type={'submit'}
                disabled={isSubmitting}
            >
                <span className={'font-bold text-white'}>로그인</span>
            </button>
        </form>
    );
}

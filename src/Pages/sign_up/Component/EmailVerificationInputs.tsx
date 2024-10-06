import axios from 'axios';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { HiOutlineEnvelope, HiOutlineExclamationCircle } from 'react-icons/hi2';
import { MdOutlinePassword } from 'react-icons/md';
import { emailRegexp } from '@/Constants/regexps.ts';

interface Props {
    updateEmailVerification(): void;
}

interface FormData {
    email: string;
    verificationCode: string;
}

export default function EmailVerificationInputs({ updateEmailVerification }: Props) {
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isVerificationRequested, setIsVerificationRequested] = useState(false);

    const {
        register,
        getValues,
        getFieldState,
        formState: { errors },
    } = useFormContext<FormData>();

    const handleVerificationRequestButtonClick = async () => {
        const email = getValues().email.replace(/\s/gi, '');
        if (email.length === 0 || getFieldState('email').invalid) {
            return;
        } else {
            if (
                window.confirm(
                    `입력한 이메일 주소는 ${email}입니다. 이메일 주소가 정확한지 확인해주세요.\n(확인 버튼을 누르면, 인증 요청 버튼을 누를 수 없습니다.)`,
                )
            ) {
                try {
                    await axios.post(`/api/email/send-auth-code`, { email });
                    setIsVerificationRequested(true);
                    window.alert('인증 코드가 발송되었습니다.');
                } catch (error) {
                    //TODO
                    // 에러처리
                }
            }
        }
    };

    const handleVerificationConfirmButtonClick = async () => {
        const verificationCode = getValues().verificationCode.replace(/\s/gi, '');
        const email = getValues().email.replace(/\s/gi, '');
        if (verificationCode === '' || getFieldState('verificationCode').invalid) {
            return;
        } else {
            try {
                await axios.post(`/api/email/check-auth-code`, {
                    email,
                    code: verificationCode,
                });
                window.alert('인증되었습니다.');
                setIsEmailVerified(true);
                updateEmailVerification();
            } catch (error) {
                //TODO
                // 에러처리
            }
        }
    };

    return (
        <div className={'flex flex-col gap-y-5'}>
            <div className={'flex w-full flex-col gap-y-2'}>
                <div
                    className={
                        'flex items-center gap-x-2 rounded-2xl border border-slate-300 px-3 py-3.5 transition-all focus-within:border-plump-purple-600'
                    }
                >
                    <HiOutlineEnvelope className={'size-5 text-slate-800'} />
                    <input
                        className={
                            'w-full flex-1 text-[0.9rem] placeholder:text-slate-400 focus:outline-none disabled:bg-white disabled:opacity-75'
                        }
                        type={'text'}
                        placeholder={'이메일'}
                        autoComplete={'off'}
                        autoCapitalize={'off'}
                        disabled={isVerificationRequested}
                        {...register('email', {
                            required: {
                                value: true,
                                message: '이메일 주소를 입력해주세요.',
                            },
                            pattern: {
                                value: emailRegexp,
                                message: '유효한 이메일 주소를 입력해주세요.',
                            },
                        })}
                    />
                    <button
                        className={
                            'mr-1 text-[0.9rem] font-bold text-plump-purple-600 hover:underline hover:underline-offset-4 disabled:opacity-75'
                        }
                        type={'button'}
                        onClick={handleVerificationRequestButtonClick}
                        disabled={isVerificationRequested}
                    >
                        인증
                    </button>
                </div>
                {errors?.email?.message && errors?.email.type === 'required' && (
                    <div className={'m-0.5 flex items-center gap-x-1 text-rose-500 '}>
                        <HiOutlineExclamationCircle className={'size-5'} />
                        <p className={'text-[0.8rem]'}>{errors.email.message}</p>
                    </div>
                )}
                {errors?.email?.message && errors?.email.type === 'pattern' && (
                    <div className={'m-0.5 flex items-center gap-x-1 text-rose-500 '}>
                        <HiOutlineExclamationCircle className={'size-5'} />
                        <p className={'text-[0.8rem]'}>{errors.email.message}</p>
                    </div>
                )}
            </div>
            <div className={'flex w-full flex-col gap-y-2'}>
                <div
                    className={
                        'flex items-center gap-x-2 rounded-2xl border border-slate-300 bg-slate-50 px-3 py-3.5 transition-all focus-within:border-plump-purple-600'
                    }
                >
                    <MdOutlinePassword className={'size-5 text-slate-800'} />
                    <input
                        className={
                            'w-full flex-1 bg-slate-50 text-[0.9rem] placeholder:text-slate-400 focus:outline-none disabled:bg-slate-50 disabled:opacity-75'
                        }
                        type={'text'}
                        placeholder={'인증 코드'}
                        autoComplete={'off'}
                        autoCapitalize={'off'}
                        disabled={!isVerificationRequested || isEmailVerified}
                        readOnly={isEmailVerified}
                        {...register('verificationCode', {
                            required: {
                                value: true,
                                message: '인증 코드를 입력해주세요.',
                            },
                        })}
                    />
                    <button
                        className={
                            'mr-1 text-[0.9rem] font-bold text-plump-purple-600 hover:underline hover:underline-offset-4 disabled:opacity-75'
                        }
                        type={'button'}
                        onClick={handleVerificationConfirmButtonClick}
                        disabled={isEmailVerified}
                    >
                        확인
                    </button>
                </div>
                {errors?.verificationCode?.message && errors?.verificationCode.type === 'required' && (
                    <div className={'m-0.5 flex items-center gap-x-1 text-rose-500 '}>
                        <HiOutlineExclamationCircle className={'size-5'} />
                        <p className={'text-[0.8rem]'}>{errors.verificationCode.message}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

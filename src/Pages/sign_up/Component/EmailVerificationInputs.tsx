import axios from 'axios';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { emailRegexp } from '@/Constants/regexps.ts';

interface FormData {
    email: string;
    verificationCode: string;
}

export default function EmailVerificationInputs() {
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
            } catch (error) {
                //TODO
                // 에러처리
            }
        }
    };

    return (
        <>
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
                        className={
                            'w-full flex-1 text-[0.9rem] focus:outline-none disabled:bg-white disabled:opacity-75'
                        }
                        type={'text'}
                        placeholder={'유효한 이메일 주소를 입력해주세요.'}
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
                        className={'mr-1 text-[0.9rem] font-bold text-violet-700'}
                        type={'button'}
                        onClick={handleVerificationRequestButtonClick}
                        disabled={isVerificationRequested}
                    >
                        인증
                    </button>
                </div>
                {errors?.email?.message && errors?.email.type === 'required' && (
                    <div className={'m-0.5 flex items-center gap-x-1 text-red-700 '}>
                        <ExclamationTriangleIcon className={'size-5'} />
                        <p className={'text-[0.8rem] font-bold'}>{errors.email.message}</p>
                    </div>
                )}
                {errors?.email?.message && errors?.email.type === 'pattern' && (
                    <div className={'m-0.5 flex items-center gap-x-1 text-red-700 '}>
                        <ExclamationTriangleIcon className={'size-5'} />
                        <p className={'text-[0.8rem] font-bold'}>{errors.email.message}</p>
                    </div>
                )}
            </div>
            <div className={'flex w-full flex-col gap-y-2'}>
                <label className={'mx-2 w-fit text-[0.9rem] font-bold'} htmlFor={'verificationCodeInput'}>
                    인증 코드
                </label>
                <div
                    className={
                        'flex items-center rounded-md border border-gray-300 px-3.5 py-3 focus-within:border-violet-700'
                    }
                >
                    <input
                        id={'verificationCodeInput'}
                        className={
                            'w-full flex-1 text-[0.9rem] focus:outline-none disabled:bg-white disabled:opacity-75'
                        }
                        type={'text'}
                        placeholder={'인증 코드를 입력해주세요.'}
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
                        className={'mr-1 text-[0.9rem] font-bold text-violet-700'}
                        type={'button'}
                        onClick={handleVerificationConfirmButtonClick}
                        disabled={isEmailVerified}
                    >
                        확인
                    </button>
                </div>
                {errors?.verificationCode?.message && errors?.verificationCode.type === 'required' && (
                    <div className={'m-0.5 flex items-center gap-x-1 text-red-700 '}>
                        <ExclamationTriangleIcon className={'size-5'} />
                        <p className={'text-[0.8rem] font-bold'}>{errors.verificationCode.message}</p>
                    </div>
                )}
            </div>
        </>
    );
}

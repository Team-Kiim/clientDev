import axios from 'axios';
import { useFormContext } from 'react-hook-form';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface Props {
    isVerificationRequested: boolean;
    isEmailVerified: boolean;
    setEmailVerifiedTrue(): void;
}

interface FormData {
    email: string;
    verificationCode: string;
}

export default function VerificationCodeInput({
    isVerificationRequested,
    isEmailVerified,
    setEmailVerifiedTrue,
}: Props) {
    const {
        register,
        getValues,
        getFieldState,
        formState: { errors },
    } = useFormContext<FormData>();

    const handleVerificationConfirmButtonClick = async () => {
        const verificationCode = getValues().verificationCode.replace(/\s/gi, '');
        const email = getValues().email.replace(/\s/gi, '');
        console.log(email, verificationCode);
        if (verificationCode === '' || getFieldState('verificationCode').invalid) {
            return;
        }

        try {
            await axios.post('/api/email/check-auth-code', {
                email,
                code: verificationCode,
            });

            window.alert('인증되었습니다.');
            setEmailVerifiedTrue();
        } catch (error) {
            //TODO
            // 에러처리
        }
    };

    return (
        <>
            <div className={'flex w-full flex-col gap-y-2'}>
                <div className={'flex gap-x-2'}>
                    <div
                        className={`relative flex w-full justify-between rounded-xl border px-4 py-3 ${errors?.verificationCode?.message ? 'border-red-500 focus-within:border-red-500' : 'border-slate-300 focus-within:border-violet-700'} transition-all`}
                    >
                        <input
                            id={'verificationCodeInput'}
                            className={
                                'peer flex-1 text-[0.9rem] placeholder-transparent focus:outline-none disabled:bg-white'
                            }
                            type={'text'}
                            disabled={!isVerificationRequested || isEmailVerified}
                            placeholder={'인증 코드'}
                            autoComplete={'off'}
                            autoCapitalize={'off'}
                            {...register('verificationCode', {
                                required: {
                                    value: true,
                                    message: '인증 코드를 입력해주세요.',
                                },
                            })}
                        />
                        <label
                            className={`absolute top-0 w-fit -translate-y-1/2 bg-white px-1 text-[0.8rem] ${errors?.verificationCode?.message ? 'text-red-500' : 'text-slate-500'} duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-[0.9rem] peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-[0.8rem] ${errors?.email?.message ? 'peer-focus:text-red-500' : 'peer-focus:text-violet-700'}`}
                            htmlFor={'verificationCodeInput'}
                        >
                            인증 코드
                        </label>
                    </div>
                    <button
                        type={'button'}
                        onMouseDown={handleVerificationConfirmButtonClick}
                        disabled={!isVerificationRequested || isEmailVerified}
                        className={
                            'shrink-0 rounded-xl border border-slate-300 bg-white px-5 text-[0.9rem] font-bold text-black transition-all hover:bg-slate-50 disabled:opacity-50'
                        }
                    >
                        확인
                    </button>
                </div>
                {errors?.verificationCode?.message && errors?.verificationCode.type === 'required' && (
                    <div className={'m-0.5 flex items-center gap-x-1 text-red-500'}>
                        <ExclamationTriangleIcon className={'size-5'} />
                        <p className={'text-[0.8rem] font-bold'}>{errors.verificationCode.message}</p>
                    </div>
                )}
                {errors?.verificationCode?.message && errors?.verificationCode.type === 'pattern' && (
                    <div className={'m-0.5 flex items-center gap-x-1 text-red-500'}>
                        <ExclamationTriangleIcon className={'size-5'} />
                        <p className={'text-[0.8rem] font-bold'}>{errors.verificationCode.message}</p>
                    </div>
                )}
            </div>
        </>
    );
}

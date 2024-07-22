import axios from 'axios';
import { useFormContext } from 'react-hook-form';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { emailRegexp } from '@/Constants/regexps.ts';

interface Props {
    isVerificationRequested: boolean;
    setVerificationRequestedTrue(): void;
}

interface FormData {
    email: string;
}

export default function EmailInputWithVerificationButton({
    isVerificationRequested,
    setVerificationRequestedTrue,
}: Props) {
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
        }

        if (window.confirm(`입력한 이메일 주소는 ${email}입니다. 이메일 주소가 정확한지 확인해주세요.`)) {
            try {
                await axios.post(`/api/email/send-auth-code`, { email });
                window.alert('인증 코드가 발송되었습니다.');
                setVerificationRequestedTrue();
            } catch (error) {
                //TODO
                // 에러처리
            }
        }
    };

    return (
        <>
            <div className={'flex w-full flex-col gap-y-2'}>
                <div className={'flex gap-x-2'}>
                    <div
                        className={`relative flex w-full justify-between rounded-xl border px-4 py-3 ${errors?.email?.message ? 'border-red-500 focus-within:border-red-500' : 'border-slate-300 focus-within:border-violet-700'} transition-all`}
                    >
                        <input
                            id={'emailInput'}
                            className={
                                'peer flex-1 text-[0.9rem] placeholder-transparent focus:outline-none disabled:bg-white'
                            }
                            type={'text'}
                            disabled={isVerificationRequested}
                            placeholder={'새 이메일'}
                            autoComplete={'off'}
                            autoCapitalize={'off'}
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: '새 이메일을 입력해주세요.',
                                },

                                pattern: {
                                    value: emailRegexp,
                                    message: '유효한 이메일 주소를 입력해주세요.',
                                },
                            })}
                        />
                        <label
                            className={`absolute top-0 w-fit -translate-y-1/2 bg-white px-1 text-[0.8rem] ${errors?.email?.message ? 'text-red-500' : 'text-slate-500'} duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-[0.9rem] peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-[0.8rem] ${errors?.email?.message ? 'peer-focus:text-red-500' : 'peer-focus:text-violet-700'}`}
                            htmlFor={'emailInput'}
                        >
                            새 이메일
                        </label>
                    </div>
                    <button
                        type={'button'}
                        onMouseDown={handleVerificationRequestButtonClick}
                        disabled={isVerificationRequested}
                        className={
                            'shrink-0 rounded-xl border border-slate-300 bg-white px-5 py-1.5 text-[0.9rem] font-bold text-black transition-all hover:bg-slate-50 disabled:opacity-50'
                        }
                    >
                        인증
                    </button>
                </div>
                {errors?.email?.message && errors?.email.type === 'required' && (
                    <div className={'m-0.5 flex items-center gap-x-1 text-red-500'}>
                        <ExclamationTriangleIcon className={'size-5'} />
                        <p className={'text-[0.8rem] font-bold'}>{errors.email.message}</p>
                    </div>
                )}
                {errors?.email?.message && errors?.email.type === 'pattern' && (
                    <div className={'m-0.5 flex items-center gap-x-1 text-red-500'}>
                        <ExclamationTriangleIcon className={'size-5'} />
                        <p className={'text-[0.8rem] font-bold'}>{errors.email.message}</p>
                    </div>
                )}
            </div>
        </>
    );
}

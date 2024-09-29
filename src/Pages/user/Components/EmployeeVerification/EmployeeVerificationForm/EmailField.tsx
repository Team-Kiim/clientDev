import axios from 'axios';
import { useFormContext } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { HiOutlineEnvelope, HiOutlineExclamationCircle } from 'react-icons/hi2';
import { emailRegexp } from '@/Constants/regexps.ts';

interface CorpInfo {
    corpName: string;
    corpEmailDomain: string;
}

interface Props {
    selectedCorpInfo: CorpInfo;
    isRequestingVerification: boolean;
    updateIsRequestingVerification(isVerificationRequested: boolean): void;
    isVerificationCodeSent: boolean;
    markAsVerificationCodeSent(): void;
}

interface FormValue {
    email: string;
}

export default function ({
    selectedCorpInfo,
    isRequestingVerification,
    updateIsRequestingVerification,
    isVerificationCodeSent,
    markAsVerificationCodeSent,
}: Props) {
    const { register, getValues, getFieldState, formState } = useFormContext<FormValue>();

    const { errors } = formState;

    const { mutate: sendVerificationCode } = useMutation({
        mutationFn: ({ email, corpName }: { email: string; corpName: string }) => {
            return axios.post('/api/corps/email-auth', {
                name: corpName,
                email,
            });
        },

        onSuccess: () => {
            window.alert('인증 코드가 발송되었습니다.');
            markAsVerificationCodeSent();
        },

        onError: () => {
            window.alert('인증 코드 발송에 실패하였습니다. 도메인을 확인하거나, 잠시 후 다시 시도해주세요.');
            updateIsRequestingVerification(false);
        },
    });

    const handleVerificationRequestButtonClick = async () => {
        const email = getValues().email.replace(/\s/gi, '');

        if (!getFieldState('email').isTouched || getFieldState('email').invalid) {
            return;
        }

        if (window.confirm(`입력한 이메일 주소는 ${email} 입니다. 이메일 주소가 정확한지 확인해주세요.`)) {
            updateIsRequestingVerification(true);
            sendVerificationCode({
                email,
                corpName: selectedCorpInfo.corpName,
            });
        }
    };

    return (
        <div className={'flex flex-col gap-y-2'}>
            <label className={'mx-2 w-fit text-[0.9rem] font-bold text-slate-800'} htmlFor={'emailInput'}>
                회사 이메일
                <span className={'text-rose-500'}>﹡</span>
            </label>
            <div className={'flex w-full items-center gap-x-2 rounded-2xl border border-slate-300 px-3 py-3.5'}>
                <HiOutlineEnvelope className={'size-5 text-slate-800'} />
                <input
                    id={'emailInput'}
                    type={'text'}
                    className={
                        'flex-1 text-[0.9rem] placeholder:text-slate-400 focus:outline-none disabled:bg-white disabled:opacity-50'
                    }
                    placeholder={'회사 이메일'}
                    autoComplete={'off'}
                    autoCapitalize={'off'}
                    disabled={isRequestingVerification || isVerificationCodeSent}
                    {...register('email', {
                        required: {
                            value: true,
                            message: '회사 이메일을 입력해주세요.',
                        },
                        pattern: {
                            value: emailRegexp,
                            message: '유효한 이메일 주소를 입력해주세요.',
                        },
                    })}
                />
                <button
                    className={
                        'text-[0.9rem] font-bold text-plump-purple-600 enabled:hover:underline enabled:hover:underline-offset-4 disabled:opacity-50'
                    }
                    type={'button'}
                    onClick={handleVerificationRequestButtonClick}
                    disabled={isRequestingVerification || isVerificationCodeSent}
                >
                    인증
                </button>
            </div>
            {errors?.email?.message && errors?.email.type === 'required' && (
                <div className={'mx-1 flex items-center gap-x-1 text-red-500'}>
                    <HiOutlineExclamationCircle className={'size-4'} />
                    <p className={'text-[0.8rem]'}>{errors.email.message}</p>
                </div>
            )}
            {errors?.email?.message && errors?.email.type === 'pattern' && (
                <div className={'mx-1 flex items-center gap-x-1 text-red-500'}>
                    <HiOutlineExclamationCircle className={'size-4'} />
                    <p className={'text-[0.8rem]'}>{errors.email.message}</p>
                </div>
            )}
        </div>
    );
}

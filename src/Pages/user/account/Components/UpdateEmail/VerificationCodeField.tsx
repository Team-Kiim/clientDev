import axios from 'axios';
import { useFormContext } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';
import { MdOutlinePassword } from 'react-icons/md';
import TOAST_OPTIONS from '@/Constants/toastOptions.ts';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    isRequestingVerification: boolean;
    isVerificationCodeSent: boolean;
    isEmailVerified: boolean;
    markAsEmailVerified(): void;
}

interface FormValues {
    newEmail: string;
    verificationCode: string;
}

export default function VerificationCodeField({
    isRequestingVerification,
    isVerificationCodeSent,
    isEmailVerified,
    markAsEmailVerified,
}: Props) {
    const { register, getFieldState, getValues, formState } = useFormContext<FormValues>();

    const { errors } = formState;

    const { mutate: confirmVerificationCode, isPending } = useMutation({
        mutationFn: ({ newEmail, verificationCode }: { newEmail: string; verificationCode: string }) => {
            return axios.post('/api/email/check-auth-code', {
                email: newEmail,
                code: verificationCode,
            });
        },

        onSuccess: () => {
            toast.success(
                <p className={'text-[0.85rem] leading-relaxed'}>
                    인증되었습니다.
                    <br />
                    변경 버튼을 누르면, 이메일 변경이 완료됩니다.
                </p>,
            );
            markAsEmailVerified();
        },

        onError: () => {
            toast.error(
                <p className={'text-[0.85rem] leading-relaxed'}>
                    인증에 실패하였습니다.
                    <br />
                    인증 코드를 확인하거나, 잠시 후 다시 시도해주세요.
                </p>,
                TOAST_OPTIONS,
            );
        },
    });

    const handleConfirmCodeButtonClick = async () => {
        const verificationCode = getValues().verificationCode.replace(/\s/gi, '');
        const newEmail = getValues().newEmail.replace(/\s/gi, '');
        if (getFieldState('verificationCode').invalid) {
            return;
        }

        confirmVerificationCode({ newEmail, verificationCode });
    };

    return (
        <>
            <div className={'flex w-1/2 flex-col gap-y-2'}>
                <label className={'w-fit text-[0.9rem] font-bold text-neutral-800'} htmlFor={'verificationCodeInput'}>
                    인증 코드
                    <span className={'text-red-500'}>﹡</span>
                </label>
            </div>
            <div className={'flex w-full gap-x-3'}>
                <p className={'w-1/2 text-[0.8rem] text-slate-500'}>
                    인증 코드 입력 후, 확인 버튼을 눌러주세요. <br />
                    인증 성공 시, 변경 버튼이 활성화됩니다.
                </p>
                <div className={'flex w-1/2 flex-col gap-y-4'}>
                    <div className={'flex flex-col gap-y-2'}>
                        <div className={'flex gap-x-2 rounded-xl border border-slate-200 px-3 py-2.5 shadow-inner'}>
                            <MdOutlinePassword className={'size-5 text-neutral-800 drop-shadow-[0px_1px_1px]'} />
                            <input
                                id={'verificationCodeInput'}
                                className={
                                    'flex-1 text-[0.9rem] placeholder:text-slate-400 focus:outline-none disabled:bg-white disabled:opacity-50'
                                }
                                placeholder={'인증 코드'}
                                autoComplete={'off'}
                                autoCapitalize={'none'}
                                disabled={
                                    !isRequestingVerification || !isVerificationCodeSent || isEmailVerified || isPending
                                }
                                {...register('verificationCode', {
                                    required: {
                                        value: true,
                                        message: '인증 코드를 입력해주세요.',
                                    },
                                })}
                            />
                        </div>
                        {errors?.verificationCode?.message && errors?.verificationCode.type === 'required' && (
                            <div className={'mx-1 flex items-center gap-x-1 text-red-500'}>
                                <HiOutlineExclamationTriangle className={'size-4'} />
                                <p className={'text-[0.8rem]'}>{errors.verificationCode.message}</p>
                            </div>
                        )}
                    </div>
                    <div className={'flex justify-end'}>
                        <button
                            className={
                                'rounded-2xl bg-neutral-800 px-4 py-2 text-[0.85rem] font-bold text-white transition-all enabled:hover:bg-neutral-800/80 disabled:opacity-50'
                            }
                            onClick={handleConfirmCodeButtonClick}
                            disabled={
                                !isRequestingVerification || !isVerificationCodeSent || isEmailVerified || isPending
                            }
                            type={'button'}
                        >
                            확인
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

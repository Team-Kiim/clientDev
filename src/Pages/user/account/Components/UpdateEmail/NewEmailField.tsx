import axios from 'axios';
import Swal from 'sweetalert2';
import { useFormContext } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { HiOutlineEnvelope, HiOutlineExclamationTriangle } from 'react-icons/hi2';
import { emailRegexp } from '@/Constants/regexps.ts';

interface Props {
    isRequestingVerification: boolean;
    updateIsRequestingVerification(isVerificationRequested: boolean): void;
    isVerificationCodeSent: boolean;
    markAsVerificationCodeSent(): void;
}

interface FormValue {
    newEmail: string;
}

export default function NewEmailField({
    isRequestingVerification,
    updateIsRequestingVerification,
    isVerificationCodeSent,
    markAsVerificationCodeSent,
}: Props) {
    const { register, getValues, getFieldState, formState } = useFormContext<FormValue>();

    const { errors } = formState;

    const { mutate: sendVerificationCode } = useMutation({
        mutationFn: (newEmail: string) => {
            return axios.post('/api/email/send-auth-code', {
                email: newEmail,
            });
        },

        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                html: "<p class='text-base'>인증 코드가 발송되었습니다.</p>",
                confirmButtonText: '확인',
                customClass: {
                    confirmButton: 'text-white bg-neutral-800 rounded-xl',
                },
            });
            markAsVerificationCodeSent();
        },

        onError: () => {
            Swal.fire({
                icon: 'error',
                html: "<p class='leading-relaxed text-base'>인증 코드 발송에 실패하였습니다.<br/> 잠시 후 인증 버튼을 눌러 다시 시도해주세요.,</p>",
                confirmButtonText: '확인',
                customClass: {
                    confirmButton: 'text-white bg-neutral-800 rounded-xl',
                },
            });
            updateIsRequestingVerification(false);
        },
    });

    const handleVerificationRequestButtonClick = async () => {
        const newEmail = getValues().newEmail.replace(/\s/gi, '');

        if (getFieldState('newEmail').invalid) {
            return;
        }

        const swalResult = await Swal.fire({
            icon: 'question',
            html: `<p class="leading-relaxed text-base">입력한 이메일 주소는  <span class="font-bold">${newEmail}</span> 입니다.<br/> 이메일 주소가 정확한지 확인해주세요.</p>`,
            showCancelButton: true,
            confirmButtonText: '인증',
            cancelButtonText: '취소',
            customClass: {
                cancelButton: 'text-black bg-slate-100 rounded-xl text-base',
                confirmButton: 'text-white bg-neutral-800 rounded-xl text-base',
            },
        });

        if (swalResult.isConfirmed) {
            updateIsRequestingVerification(true);
            sendVerificationCode(newEmail);
        }
    };

    return (
        <>
            <div className={'flex w-1/2 flex-col gap-y-2'}>
                <label className={'w-fit text-[0.9rem] font-bold text-neutral-800'} htmlFor={'newEmailInput'}>
                    새 이메일
                    <span className={'text-red-500'}>﹡</span>
                </label>
            </div>
            <div className={'flex w-full gap-x-3'}>
                <p className={'w-1/2 text-[0.8rem] text-slate-500'}>
                    새 이메일 입력 후, 인증 버튼을 누르면, <br /> 이메일로 인증 코드가 발송됩니다.
                </p>
                <div className={'flex w-1/2 flex-col gap-y-4'}>
                    <div className={'flex flex-col gap-y-2'}>
                        <div className={'flex gap-x-2 rounded-xl border border-slate-200 px-3 py-2.5 shadow-inner'}>
                            <HiOutlineEnvelope className={'size-5 text-neutral-800 drop-shadow-[0px_1px_1px]'} />
                            <input
                                id={'newEmailInput'}
                                className={
                                    'flex-1 text-[0.9rem] placeholder:text-slate-400 focus:outline-none disabled:bg-white disabled:opacity-50'
                                }
                                placeholder={'새 이메일'}
                                autoComplete={'off'}
                                autoCapitalize={'none'}
                                disabled={isRequestingVerification || isVerificationCodeSent}
                                {...register('newEmail', {
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
                        </div>
                        {errors?.newEmail?.message && errors?.newEmail.type === 'required' && (
                            <div className={'mx-1 flex items-center gap-x-1 text-red-500'}>
                                <HiOutlineExclamationTriangle className={'size-4'} />
                                <p className={'text-[0.8rem]'}>{errors.newEmail.message}</p>
                            </div>
                        )}
                        {errors?.newEmail?.message && errors?.newEmail.type === 'pattern' && (
                            <div className={'mx-1 flex items-center gap-x-1 text-red-500'}>
                                <HiOutlineExclamationTriangle className={'size-4'} />
                                <p className={'text-[0.8rem]'}>{errors.newEmail.message}</p>
                            </div>
                        )}
                    </div>
                    <div className={'flex justify-end'}>
                        <button
                            className={
                                'rounded-2xl bg-neutral-800 px-4 py-2 text-[0.85rem] font-bold text-white transition-all enabled:hover:bg-neutral-800/80  disabled:opacity-50'
                            }
                            type={'button'}
                            onClick={handleVerificationRequestButtonClick}
                            disabled={isRequestingVerification || isVerificationCodeSent}
                        >
                            인증
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

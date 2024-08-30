import axios from 'axios';
import { useReducer } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import { HiOutlineExclamationTriangle, HiOutlineEye, HiOutlineEyeSlash, HiOutlineLockClosed } from 'react-icons/hi2';
import TOAST_OPTIONS from '@/Constants/toastOptions.ts';

interface Props {
    isRequestingVerification: boolean;
    updateIsRequestingVerification(isRequestingVerification: boolean): void;
    isPasswordVerified: boolean;
    markAsPasswordVerified(): void;
}

interface FormValue {
    currentPassword: string;
}

export default function CurrentPasswordField({
    isRequestingVerification,
    updateIsRequestingVerification,
    isPasswordVerified,
    markAsPasswordVerified,
}: Props) {
    const [isPasswordVisible, toggleIsPasswordVisible] = useReducer(state => !state, false);

    const { register, getValues, getFieldState, formState } = useFormContext<FormValue>();

    const { errors } = formState;

    const { mutate: verifyPassword } = useMutation({
        mutationFn: (currentPassword: string) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (Math.trunc(Math.random() * 10000) % 2 === 0) {
                        resolve(currentPassword);
                    } else {
                        reject('failed');
                    }
                }, 3000);
            });
        },

        onSuccess: () => {
            toast.success(
                <p className={'text-[0.85rem] leading-relaxed'}>
                    인증되었습니다.
                    <br />새 비밀번호를 설정할 수 있습니다.
                </p>,
            );
            markAsPasswordVerified();
        },

        onError: () => {
            toast.error(
                <p className={'text-[0.85rem] leading-relaxed'}>
                    인증에 실패하였습니다.
                    <br />
                    현재 비밀번호를 확인하거나, 잠시 후 다시 시도해주세요.
                </p>,
                TOAST_OPTIONS,
            );
            updateIsRequestingVerification(false);
        },
    });

    const handleVerificationRequestButtonClick = async () => {
        const currentPassword = getValues().currentPassword.replace(/\s/gi, '');

        if (!getFieldState('currentPassword').isTouched || getFieldState('currentPassword').invalid) {
            return;
        }

        verifyPassword(currentPassword);
        updateIsRequestingVerification(true);
    };

    return (
        <div className={'flex w-full flex-col gap-y-3'}>
            <div className={'flex w-1/2 flex-col gap-y-2'}>
                <label className={'w-fit text-[0.9rem] font-bold text-neutral-800'} htmlFor={'currentPasswordInput'}>
                    현재 비밀번호
                    <span className={'text-red-500'}>﹡</span>
                </label>
            </div>
            <div className={'flex w-full gap-x-3'}>
                <p className={'w-1/2 text-[0.8rem] text-slate-500'}>
                    현재 비밀번호 입력 후, 인증 버튼을 눌러주세요.
                    <br />
                    인증 성공 시, 새 비밀번호를 설정할 수 있습니다.
                </p>
                <div className={'flex w-1/2 flex-col gap-y-4'}>
                    <div className={'flex flex-col gap-y-2'}>
                        <div className={'flex gap-x-2 rounded-xl border border-slate-200 px-3 py-2.5 shadow-inner'}>
                            <HiOutlineLockClosed className={'size-5 text-neutral-800 drop-shadow-[0px_1px_1px]'} />
                            <input
                                id={'currentPasswordInput'}
                                className={
                                    'flex-1 text-[0.9rem] placeholder:text-slate-400 focus:outline-none disabled:bg-white disabled:opacity-50'
                                }
                                type={isPasswordVisible ? 'text' : 'password'}
                                placeholder={'현재 비밀번호'}
                                autoComplete={'off'}
                                autoCapitalize={'none'}
                                disabled={isRequestingVerification || isPasswordVerified}
                                {...register('currentPassword', {
                                    required: {
                                        value: true,
                                        message: '현재 비밀번호를 입력해주세요.',
                                    },
                                })}
                            />
                            <button
                                type={'button'}
                                onMouseDown={() => {
                                    toggleIsPasswordVisible();
                                }}
                            >
                                {isPasswordVisible ? (
                                    <HiOutlineEyeSlash
                                        className={'size-5 text-neutral-800 drop-shadow-[0px_1px_1px]'}
                                    />
                                ) : (
                                    <HiOutlineEye className={'size-5 text-neutral-800 drop-shadow-[0px_1px_1px]'} />
                                )}
                            </button>
                        </div>
                        {errors?.currentPassword?.message && errors?.currentPassword.type === 'required' && (
                            <div className={'mx-1 flex items-center gap-x-1 text-red-500'}>
                                <HiOutlineExclamationTriangle className={'size-4'} />
                                <p className={'text-[0.8rem]'}>{errors.currentPassword.message}</p>
                            </div>
                        )}
                    </div>
                    <div className={'flex justify-end'}>
                        <button
                            className={
                                'rounded-2xl bg-neutral-800 px-4 py-2 text-[0.85rem] font-bold text-white transition-all enabled:hover:bg-neutral-800/80 disabled:opacity-50'
                            }
                            type={'button'}
                            onClick={handleVerificationRequestButtonClick}
                            disabled={isRequestingVerification || isPasswordVerified}
                        >
                            인증
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

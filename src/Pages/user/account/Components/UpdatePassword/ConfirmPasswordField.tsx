import { useReducer } from 'react';
import { useFormContext } from 'react-hook-form';
import { HiOutlineExclamationCircle, HiOutlineEye, HiOutlineEyeSlash, HiOutlineLockClosed } from 'react-icons/hi2';

interface Props {
    isPasswordVerified: boolean;
}

interface FormValues {
    newPassword: string;
    confirmPassword: string;
}

export default function ConfirmPasswordField({ isPasswordVerified }: Props) {
    const [isPasswordVisible, toggleIsPasswordVisible] = useReducer(state => !state, false);

    const { register, getValues, formState } = useFormContext<FormValues>();

    const { errors } = formState;

    return (
        <div className={'flex w-full flex-col gap-y-3'}>
            <div className={'flex w-1/2 flex-col gap-y-2'}>
                <label className={'w-fit text-[0.9rem] font-bold text-neutral-800'} htmlFor={'confirmPasswordInput'}>
                    비밀번호 확인
                    <span className={'text-rose-500'}>﹡</span>
                </label>
            </div>
            <div className={'flex w-full gap-x-3'}>
                <p className={'w-1/2 text-[0.8rem] text-slate-500'}>
                    위에서 입력한 비밀번호를 다시 한 번 입력해주세요.
                </p>
                <div className={'flex w-1/2 flex-col gap-y-2'}>
                    <div className={'flex gap-x-2 rounded-xl border border-slate-300 px-3 py-2.5'}>
                        <HiOutlineLockClosed className={'size-5 text-neutral-800'} />
                        <input
                            id={'confirmPasswordInput'}
                            className={
                                'flex-1 text-[0.9rem] placeholder:text-slate-400 focus:outline-none disabled:bg-white disabled:opacity-50'
                            }
                            type={isPasswordVisible ? 'text' : 'password'}
                            placeholder={'비밀번호 확인'}
                            autoComplete={'off'}
                            autoCapitalize={'none'}
                            disabled={!isPasswordVerified}
                            {...register('confirmPassword', {
                                required: {
                                    value: true,
                                    message: '비밀번호를 입력해주세요.',
                                },
                                validate: {
                                    isNotMatched: confirmPassword => {
                                        const newPassword = getValues('newPassword');
                                        return (
                                            newPassword === confirmPassword ||
                                            '위에서 입력한 비밀번호와 일치하지 않습니다.'
                                        );
                                    },
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
                                <HiOutlineEyeSlash className={'size-5 text-neutral-800'} />
                            ) : (
                                <HiOutlineEye className={'size-5 text-neutral-800'} />
                            )}
                        </button>
                    </div>
                    {errors?.confirmPassword?.message && errors?.confirmPassword.type === 'required' && (
                        <div className={'mx-1 flex items-center gap-x-1 text-rose-500'}>
                            <HiOutlineExclamationCircle className={'size-4'} />
                            <p className={'text-[0.8rem]'}>{errors.confirmPassword.message}</p>
                        </div>
                    )}
                    {errors?.confirmPassword?.message && errors?.confirmPassword.type === 'isNotMatched' && (
                        <div className={'mx-1 flex items-center gap-x-1 text-rose-500'}>
                            <HiOutlineExclamationCircle className={'size-4'} />
                            <p className={'text-[0.8rem]'}>{errors.confirmPassword.message}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

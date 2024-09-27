import { useReducer } from 'react';
import { useFormContext } from 'react-hook-form';
import { HiOutlineExclamationCircle, HiOutlineEye, HiOutlineEyeSlash, HiOutlineLockClosed } from 'react-icons/hi2';
import { passwordRegexp } from '@/Constants/regexps.ts';

interface Props {
    isPasswordVerified: boolean;
}

interface FormValue {
    newPassword: string;
}

export default function NewPasswordField({ isPasswordVerified }: Props) {
    const [isPasswordVisible, toggleIsPasswordVisible] = useReducer(state => !state, false);

    const { register, formState } = useFormContext<FormValue>();

    const { errors } = formState;

    return (
        <div className={'flex w-full flex-col gap-y-3'}>
            <div className={'flex w-1/2 flex-col gap-y-2'}>
                <label className={'w-fit text-[0.9rem] font-bold text-neutral-800'} htmlFor={'newPasswordInput'}>
                    새 비밀번호
                    <span className={'text-rose-500'}>﹡</span>
                </label>
            </div>
            <div className={'flex w-full gap-x-3'}>
                <p className={'w-1/2 text-[0.8rem] text-slate-500'}>
                    새 비밀번호를 입력해주세요.
                    <br />
                    7자 이상 20자 이하, 알파벳, 숫자, 특수문자를 포함해야 합니다.
                </p>
                <div className={'flex w-1/2 flex-col gap-y-2'}>
                    <div className={'flex gap-x-2 rounded-xl border border-slate-300 px-3 py-2.5'}>
                        <HiOutlineLockClosed className={'size-5 text-neutral-800'} />
                        <input
                            id={'newPasswordInput'}
                            className={
                                'flex-1 text-[0.9rem] placeholder:text-slate-400 focus:outline-none disabled:bg-white disabled:opacity-50'
                            }
                            type={isPasswordVisible ? 'text' : 'password'}
                            placeholder={'새 비밀번호'}
                            autoComplete={'off'}
                            autoCapitalize={'none'}
                            disabled={!isPasswordVerified}
                            {...register('newPassword', {
                                required: {
                                    value: true,
                                    message: '새 비밀번호를 입력해주세요.',
                                },
                                pattern: {
                                    value: passwordRegexp,
                                    message: '7~20자의 알파벳, 숫자, 특수문자를 포함해야 합니다.',
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
                    {errors?.newPassword?.message && errors?.newPassword.type === 'required' && (
                        <div className={'mx-1 flex items-center gap-x-1 text-rose-500'}>
                            <HiOutlineExclamationCircle className={'size-4'} />
                            <p className={'text-[0.8rem]'}>{errors.newPassword.message}</p>
                        </div>
                    )}
                    {errors?.newPassword?.message && errors?.newPassword.type === 'pattern' && (
                        <div className={'mx-1 flex items-center gap-x-1 text-rose-500'}>
                            <HiOutlineExclamationCircle className={'size-4'} />
                            <p className={'text-[0.8rem]'}>{errors.newPassword.message}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

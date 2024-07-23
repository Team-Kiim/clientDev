import { useFormContext } from 'react-hook-form';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface Props {
    isPasswordVerified: boolean;
}

interface FormData {
    newPassword: string;
    confirmPassword: string;
}

export default function ConfirmPasswordField({ isPasswordVerified }: Props) {
    const {
        register,
        formState: { errors },
        getValues,
    } = useFormContext<FormData>();

    return (
        <div className={'flex w-full flex-col gap-y-2'}>
            <div className={'flex items-center gap-x-2'}>
                <div
                    className={`relative flex w-full justify-between rounded-xl border px-4 py-3 ${errors?.confirmPassword?.message ? 'border-red-500 focus-within:border-red-500' : 'border-slate-300 focus-within:border-violet-700'} transition-all`}
                >
                    <input
                        id={'confirmPasswordInput'}
                        className={
                            'peer flex-1 text-[0.9rem] placeholder-transparent focus:outline-none disabled:bg-white'
                        }
                        type={'password'}
                        disabled={!isPasswordVerified}
                        placeholder={'비밀번호 확인'}
                        autoComplete={'off'}
                        autoCapitalize={'off'}
                        {...register('confirmPassword', {
                            required: {
                                value: true,
                                message: '비밀번호를 입력해주세요.',
                            },
                            validate: {
                                notMatched(value) {
                                    const newPassword = getValues().newPassword;
                                    return newPassword === value || '위에서 입력한 비밀번호와 일치하지 않습니다.';
                                },
                            },
                        })}
                    />
                    <label
                        className={`absolute top-0 w-fit -translate-y-1/2 bg-white px-0.5 text-[0.8rem] ${errors?.confirmPassword?.message ? 'text-red-500' : 'text-slate-500'} duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-[0.9rem] peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-[0.8rem] ${errors?.confirmPassword?.message ? 'peer-focus:text-red-500' : 'peer-focus:text-violet-700'}`}
                        htmlFor={'confirmPasswordInput'}
                    >
                        비밀번호 확인
                    </label>
                </div>
            </div>
            {errors?.confirmPassword?.message && errors?.confirmPassword.type === 'required' && (
                <div className={'m-0.5 flex items-center gap-x-1 text-red-500'}>
                    <ExclamationTriangleIcon className={'size-5'} />
                    <p className={'text-[0.8rem] font-bold'}>{errors.confirmPassword.message}</p>
                </div>
            )}
            {errors?.confirmPassword?.message && errors?.confirmPassword.type === 'notMatched' && (
                <div className={'m-0.5 flex items-center gap-x-1 text-red-500'}>
                    <ExclamationTriangleIcon className={'size-5'} />
                    <p className={'text-[0.8rem] font-bold'}>{errors.confirmPassword.message}</p>
                </div>
            )}
        </div>
    );
}

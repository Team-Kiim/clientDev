import { useFormContext } from 'react-hook-form';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { passwordRegexp } from '@/Constants/regexps.ts';

interface Props {
    isPasswordVerified: boolean;
}

interface FormData {
    newPassword: string;
}

export default function NewPasswordField({ isPasswordVerified }: Props) {
    const {
        register,
        formState: { errors },
    } = useFormContext<FormData>();

    return (
        <div className={'flex w-full flex-col gap-y-2'}>
            <div className={'flex items-center gap-x-2'}>
                <div
                    className={`relative flex w-full justify-between rounded-xl border px-4 py-3 ${errors?.newPassword?.message ? 'border-red-500 focus-within:border-red-500' : 'border-slate-300 focus-within:border-violet-700'} transition-all`}
                >
                    <input
                        id={'newPasswordInput'}
                        className={
                            'peer flex-1 text-[0.9rem] placeholder-transparent focus:outline-none disabled:bg-white'
                        }
                        type={'password'}
                        disabled={!isPasswordVerified}
                        placeholder={'새 비밀번호'}
                        autoComplete={'off'}
                        autoCapitalize={'off'}
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
                    <label
                        className={`absolute top-0 w-fit -translate-y-1/2 bg-white px-0.5 text-[0.8rem] ${errors?.newPassword?.message ? 'text-red-500' : 'text-slate-500'} duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-[0.9rem] peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-[0.8rem] ${errors?.newPassword?.message ? 'peer-focus:text-red-500' : 'peer-focus:text-violet-700'}`}
                        htmlFor={'newPasswordInput'}
                    >
                        새 비밀번호
                    </label>
                </div>
            </div>
            {errors?.newPassword?.message && errors?.newPassword.type === 'required' && (
                <div className={'m-0.5 flex items-center gap-x-1 text-red-500'}>
                    <ExclamationTriangleIcon className={'size-5'} />
                    <p className={'text-[0.8rem] font-bold'}>{errors.newPassword.message}</p>
                </div>
            )}
            {errors?.newPassword?.message && errors?.newPassword.type === 'pattern' && (
                <div className={'m-0.5 flex items-center gap-x-1 text-red-500'}>
                    <ExclamationTriangleIcon className={'size-5'} />
                    <p className={'text-[0.8rem] font-bold'}>{errors.newPassword.message}</p>
                </div>
            )}
        </div>
    );
}

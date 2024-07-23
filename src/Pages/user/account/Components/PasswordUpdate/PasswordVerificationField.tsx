import { useFormContext } from 'react-hook-form';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface Props {
    isPasswordVerified: boolean;
    completePasswordVerification(): void;
}

interface FormData {
    currentPassword: string;
}

export default function PasswordVerificationField({ isPasswordVerified, completePasswordVerification }: Props) {
    const {
        register,
        getFieldState,
        getValues,
        formState: { errors },
    } = useFormContext<FormData>();

    const handlePasswordVerificationRequestButtonClick = async () => {
        const { currentPassword } = getValues();
        if (currentPassword.length === 0 || getFieldState('currentPassword').invalid) {
            return;
        }

        completePasswordVerification();
    };

    return (
        <div className={'flex w-full flex-col gap-y-2'}>
            <div className={'flex items-center gap-x-2'}>
                <div
                    className={`relative flex w-full justify-between rounded-xl border px-4 py-3 ${errors?.currentPassword?.message ? 'border-red-500 focus-within:border-red-500' : 'border-slate-300 focus-within:border-violet-700'} transition-all`}
                >
                    <input
                        id={'currentPasswordInput'}
                        className={
                            'peer flex-1 text-[0.9rem] placeholder-transparent focus:outline-none disabled:bg-white'
                        }
                        type={'password'}
                        disabled={isPasswordVerified}
                        placeholder={'현재 비밀번호'}
                        autoComplete={'off'}
                        autoCapitalize={'off'}
                        {...register('currentPassword', {
                            required: {
                                value: true,
                                message: '현재 비밀번호를 입력해주세요.',
                            },
                        })}
                    />
                    <label
                        className={`absolute top-0 w-fit -translate-y-1/2 bg-white px-0.5 text-[0.8rem] ${errors?.currentPassword?.message ? 'text-red-500' : 'text-slate-500'} duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-[0.9rem] peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-[0.8rem] ${errors?.currentPassword?.message ? 'peer-focus:text-red-500' : 'peer-focus:text-violet-700'}`}
                        htmlFor={'currentPasswordInput'}
                    >
                        현재 비밀번호
                    </label>
                </div>
                <button
                    type={'button'}
                    onMouseDown={handlePasswordVerificationRequestButtonClick}
                    disabled={isPasswordVerified}
                    className={
                        'shrink-0 rounded-xl border border-slate-300 bg-white px-5 py-3 text-[0.9rem] font-bold text-black transition-all hover:bg-slate-50 disabled:opacity-50'
                    }
                >
                    인증
                </button>
            </div>
            {errors?.currentPassword?.message && errors?.currentPassword.type === 'required' && (
                <div className={'m-0.5 flex items-center gap-x-1 text-red-500'}>
                    <ExclamationTriangleIcon className={'size-5'} />
                    <p className={'text-[0.8rem] font-bold'}>{errors.currentPassword.message}</p>
                </div>
            )}
        </div>
    );
}

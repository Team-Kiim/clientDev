import { useFormContext } from 'react-hook-form';
import { HiOutlineExclamationCircle } from 'react-icons/hi2';
import { MdOutlinePassword } from 'react-icons/md';

interface Props {
    isRequestingVerification: boolean;
    isVerificationCodeSent: boolean;
}

interface FormValues {
    email: string;
    verificationCode: string;
}

export default function VerificationCodeField({ isRequestingVerification, isVerificationCodeSent }: Props) {
    const { register, formState } = useFormContext<FormValues>();

    const { errors } = formState;

    return (
        <div className={'flex flex-col gap-y-2'}>
            <label className={'mx-2 w-fit text-[0.9rem] font-bold text-slate-800'} htmlFor={'verificationCodeInput'}>
                인증 코드
                <span className={'text-rose-500'}>﹡</span>
            </label>
            <div className={'flex w-full items-center gap-x-2 rounded-2xl border border-slate-300 px-3 py-3.5'}>
                <MdOutlinePassword className={'size-5 text-slate-800'} />
                <input
                    id={'verificationCodeInput'}
                    type={'text'}
                    className={
                        'flex-1 text-[0.9rem] placeholder:text-slate-400 focus:outline-none disabled:bg-white disabled:opacity-50'
                    }
                    placeholder={'인증 코드'}
                    autoComplete={'off'}
                    autoCapitalize={'off'}
                    disabled={!isRequestingVerification || !isVerificationCodeSent}
                    {...register('verificationCode', {
                        required: {
                            value: true,
                            message: '인증 코드를 입력해주세요.',
                        },
                    })}
                />
            </div>
            {errors?.verificationCode?.message && errors?.verificationCode.type === 'required' && (
                <div className={'mx-1 flex items-center gap-x-1 text-rose-500'}>
                    <HiOutlineExclamationCircle className={'size-4'} />
                    <p className={'text-[0.8rem]'}>{errors.verificationCode.message}</p>
                </div>
            )}
        </div>
    );
}

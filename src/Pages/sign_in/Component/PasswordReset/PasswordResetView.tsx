import { SubmitHandler, useForm } from 'react-hook-form';
import { MdLockReset } from 'react-icons/md';
import { HiOutlineEnvelope, HiOutlineExclamationCircle } from 'react-icons/hi2';
import { emailRegexp } from '@/Constants/regexps.ts';

interface Props {
    completePasswordReset(): void;
}

interface FormData {
    email: string;
}

export default function PasswordResetView({ completePasswordReset }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            email: '',
        },
    });

    const onSubmit: SubmitHandler<FormData> = async data => {
        const email = data.email.replace(/\s/gi, '');
        console.log(email);
        completePasswordReset();
    };

    return (
        <div className={'flex flex-col gap-y-8'}>
            <div className={'flex flex-col items-center gap-y-4'}>
                <div className={'rounded-full bg-plump-purple-50 p-1'}>
                    <MdLockReset className={'size-7 text-plump-purple-600'} />
                </div>
                <h1 className={'text-lg font-bold'}>비밀번호 재설정</h1>
                <p className={'text-center text-[0.83rem] text-slate-500'}>
                    이메일로 임시 비밀번호가 전송됩니다. <br />
                    이후, 마이 페이지 &gt; 계정 관리에서 비밀번호를 변경해주세요.
                </p>
            </div>
            <form className={'flex w-full flex-col items-center gap-y-8'} onSubmit={handleSubmit(onSubmit)}>
                <div className={'flex w-full flex-col gap-y-2'}>
                    <div
                        className={
                            'flex items-center gap-x-2 rounded-2xl border border-slate-300 px-3 py-3.5 transition-all focus-within:border-plump-purple-600'
                        }
                    >
                        <HiOutlineEnvelope className={'size-5 text-slate-800'} />
                        <input
                            className={'flex-1 text-[0.9rem] placeholder:text-slate-400 focus:outline-none'}
                            type={'text'}
                            placeholder={'가입한 이메일'}
                            autoComplete={'off'}
                            autoCapitalize={'off'}
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: '이메일을 입력해주세요.',
                                },
                                pattern: {
                                    value: emailRegexp,
                                    message: '유효한 이메일 주소를 입력해주세요.',
                                },
                            })}
                        />
                    </div>
                    {errors?.email?.message && errors?.email.type === 'required' && (
                        <div className={'m-0.5 flex items-center gap-x-1 text-rose-500'}>
                            <HiOutlineExclamationCircle className={'size-5'} />
                            <p className={'text-[0.8rem]'}>{errors.email.message}</p>
                        </div>
                    )}
                    {errors?.email?.message && errors?.email.type === 'pattern' && (
                        <div className={'m-0.5 flex items-center gap-x-1 text-rose-500'}>
                            <HiOutlineExclamationCircle className={'size-5'} />
                            <p className={'text-[0.8rem]'}>{errors.email.message}</p>
                        </div>
                    )}
                </div>
                <button
                    className={
                        'rounded-2xl bg-plump-purple-600 px-10 py-3 text-[0.9rem] font-bold text-white transition-all hover:bg-plump-purple-700'
                    }
                >
                    메일로 전송
                </button>
            </form>
        </div>
    );
}

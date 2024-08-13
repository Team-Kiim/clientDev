import { useFormContext } from 'react-hook-form';
import { HiOutlineExclamationTriangle, HiOutlineIdentification } from 'react-icons/hi2';

interface FormData {
    nickname: string;
}

export default function NicknameInput() {
    const {
        register,
        formState: { errors },
    } = useFormContext<FormData>();

    return (
        <div className={'flex w-full flex-col gap-y-2'}>
            <div
                className={
                    'flex items-center gap-x-2 rounded-xl border border-slate-300 px-2 py-3.5 focus-within:border-violet-700'
                }
            >
                <HiOutlineIdentification className={'size-6 text-slate-500'} />
                <input
                    className={'flex-1 text-[0.9rem] focus:outline-none'}
                    type={'text'}
                    placeholder={'닉네임 (3자 이상 20자 이하)'}
                    autoComplete={'off'}
                    autoCapitalize={'off'}
                    {...register('nickname', {
                        required: { value: true, message: '닉네임을 입력해주세요.' },
                        maxLength: { value: 20, message: '3자 이상 20자 이하로 입력해주세요.' },
                        minLength: { value: 3, message: '3자 이상 20자 이하로 입력해주세요.' },
                    })}
                />
            </div>
            {errors?.nickname?.message && errors?.nickname.type === 'required' && (
                <div className={'m-0.5 flex items-center gap-x-1 text-red-500'}>
                    <HiOutlineExclamationTriangle className={'size-5'} />
                    <p className={'text-[0.8rem]'}>{errors.nickname.message}</p>
                </div>
            )}
            {errors?.nickname?.message && errors?.nickname.type === 'maxLength' && (
                <div className={'m-0.5 flex items-center gap-x-1 text-red-500'}>
                    <HiOutlineExclamationTriangle className={'size-5'} />
                    <p className={'text-[0.8rem]'}>{errors.nickname.message}</p>
                </div>
            )}
            {errors?.nickname?.message && errors?.nickname.type === 'minLength' && (
                <div className={'m-0.5 flex items-center gap-x-1 text-red-500'}>
                    <HiOutlineExclamationTriangle className={'size-5'} />
                    <p className={'text-[0.8rem]'}>{errors.nickname.message}</p>
                </div>
            )}
        </div>
    );
}

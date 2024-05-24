import { useFormContext } from 'react-hook-form';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

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
            <label className={'mx-2 w-fit text-[0.9rem] font-bold'} htmlFor={'nicknameInput'}>
                닉네임
            </label>
            <div
                className={
                    'flex items-center rounded-md border border-gray-300 px-3.5 py-3 focus-within:border-violet-700'
                }
            >
                <input
                    id={'nicknameInput'}
                    className={'w-full flex-1 text-[0.9rem] focus:outline-none'}
                    type={'text'}
                    placeholder={'최대 20자'}
                    autoComplete={'off'}
                    autoCapitalize={'off'}
                    {...register('nickname', {
                        required: { value: true, message: '닉네임을 입력해주세요.' },
                        maxLength: { value: 20, message: '최대 20자까지 입력 가능합니다.' },
                    })}
                />
            </div>
            {errors?.nickname?.message && errors?.nickname.type === 'required' && (
                <div className={'m-0.5 flex items-center gap-x-1 text-red-700'}>
                    <ExclamationTriangleIcon className={'size-5'} />
                    <p className={'text-sm'}>{errors.nickname.message}</p>
                </div>
            )}
            {errors?.nickname?.message && errors?.nickname.type === 'maxLength' && (
                <div className={'m-0.5 flex items-center gap-x-1 text-red-700'}>
                    <ExclamationTriangleIcon className={'size-5'} />
                    <p className={'text-sm'}>{errors.nickname.message}</p>
                </div>
            )}
        </div>
    );
}

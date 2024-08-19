import { useFormContext } from 'react-hook-form';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';

interface Props {
    isVoteEditable: boolean;
}

interface FormData {
    voteTopic: string;
}

export default function VoteTopicField({ isVoteEditable }: Props) {
    const { register, formState } = useFormContext<FormData>();

    const { errors } = formState;

    return (
        <div className={'flex flex-col gap-y-2'}>
            <label className={'mx-1 w-fit text-[0.9rem] font-bold'} htmlFor={'voteTopicInput'}>
                투표 주제
                <span className={'text-red-500'}>﹡</span>
            </label>
            <div className={'flex rounded-lg border border-slate-300 px-3.5 py-2.5'}>
                <input
                    id={'voteTopicInput'}
                    className={
                        'flex-1 text-[0.95rem] placeholder:text-slate-400 focus:outline-none disabled:bg-white disabled:opacity-50'
                    }
                    type={'text'}
                    placeholder={'투표 주제를 입력해주세요.'}
                    disabled={!isVoteEditable}
                    autoComplete={'off'}
                    autoCapitalize={'off'}
                    {...register('voteTopic', {
                        required: {
                            value: true,
                            message: '투표 주제를 입력해주세요.',
                        },

                        maxLength: {
                            value: 30,
                            message: '최대 30자까지 입력 가능해요.',
                        },
                    })}
                />
            </div>
            {errors?.voteTopic?.message && errors?.voteTopic.type === 'required' && (
                <div className={'mx-0.5 flex items-center gap-x-1 text-red-500'}>
                    <HiOutlineExclamationTriangle className={'size-4'} />
                    <p className={'text-[0.85rem]'}>{errors.voteTopic.message}</p>
                </div>
            )}
            {errors?.voteTopic?.message && errors?.voteTopic.type === 'maxLength' && (
                <div className={'mx-0.5 flex items-center gap-x-1 text-red-500'}>
                    <HiOutlineExclamationTriangle className={'size-4'} />
                    <p className={'text-[0.85rem]'}>{errors.voteTopic.message}</p>
                </div>
            )}
        </div>
    );
}

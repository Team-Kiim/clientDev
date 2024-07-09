import { useFormContext } from 'react-hook-form';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface FormData {
    voteTopic: string;
}

export default function VoteTopicInput() {
    const formMethods = useFormContext<FormData>();

    const { errors } = formMethods.formState;

    return (
        <div className={'flex flex-col gap-y-1.5'}>
            <div className={'flex flex-col gap-y-2'}>
                <label className={'mx-1 w-fit text-[0.94rem] font-bold'} htmlFor={'voteTopicInput'}>
                    투표 주제
                </label>
                <input
                    className={
                        'h-[2.8rem] rounded border border-slate-300 px-3 py-2.5 text-[0.93rem] font-bold transition-all focus:outline-black'
                    }
                    id={'voteTopicInput'}
                    placeholder={'투표 주제를 입력해주세요.(최대 30자)'}
                    {...formMethods.register('voteTopic', {
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
                <div className={'m-0.5 flex items-center gap-x-1 text-red-700'}>
                    <ExclamationTriangleIcon className={'size-5'} />
                    <p className={'text-sm font-bold'}>{errors.voteTopic.message}</p>
                </div>
            )}
            {errors?.voteTopic?.message && errors?.voteTopic.type === 'maxLength' && (
                <div className={'m-0.5 flex items-center gap-x-1 text-red-700'}>
                    <ExclamationTriangleIcon className={'size-5'} />
                    <p className={'text-sm font-bold'}>{errors.voteTopic.message}</p>
                </div>
            )}
        </div>
    );
}

import { useFieldArray, useFormContext } from 'react-hook-form';
import { LuPlus, LuX } from 'react-icons/lu';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface FormData {
    firstVoteItem: string;
    secondVoteItem: string;
    additionalVoteItems: {
        label: string;
    }[];
}

export default function VoteItemInputs() {
    const formMethods = useFormContext<FormData>();
    const { errors } = formMethods.formState;

    const { fields, append, remove } = useFieldArray({
        control: formMethods.control,
        name: 'additionalVoteItems',
    });

    return (
        <div className={'flex flex-col gap-y-1.5'}>
            <div className={'flex flex-col gap-y-2'}>
                <span className={'mx-1 text-[0.94rem] font-bold'}>투표 항목</span>
                <div className={'flex flex-col gap-y-3'}>
                    <div
                        className={
                            'h-[2.8rem] rounded border border-slate-300 px-3 py-2.5 text-[0.93rem] transition-all focus-within:border-black'
                        }
                    >
                        <input
                            type={'text'}
                            className={'w-full focus:outline-none'}
                            {...formMethods.register('firstVoteItem', {
                                required: {
                                    value: true,
                                    message: ' ',
                                },
                            })}
                            placeholder={'투표 항목 (1) (필수입력)'}
                        />
                    </div>
                    <div
                        className={
                            'h-[2.8rem] rounded border border-slate-300 px-3 py-2.5 text-[0.93rem] transition-all focus-within:border-black'
                        }
                    >
                        <input
                            type={'text'}
                            className={'w-full focus:outline-none'}
                            {...formMethods.register('secondVoteItem', {
                                required: {
                                    value: true,
                                    message: ' ',
                                },
                            })}
                            placeholder={'투표 항목 (2) (필수입력)'}
                        />
                    </div>
                    {fields.map((item, index) => {
                        return (
                            <div
                                key={item.id}
                                className={
                                    'flex h-[2.8rem] items-center gap-x-2 rounded border border-slate-300 px-3 py-2.5 text-[0.93rem] transition-all focus-within:border-black'
                                }
                            >
                                <input
                                    type={'text'}
                                    className={'flex-1 focus:outline-none'}
                                    placeholder={`투표 항목 (${index + 3})`}
                                    {...formMethods.register(`additionalVoteItems.${index}.label` as const)}
                                />
                                <button
                                    className={'rounded-full p-1.5 transition-all hover:bg-red-50'}
                                    type={'button'}
                                    onMouseDown={() => {
                                        remove(index);
                                    }}
                                >
                                    <LuX className={'size-5 text-red-600'} />
                                </button>
                            </div>
                        );
                    })}
                    <div className={'flex justify-center'}>
                        <button
                            className={
                                'flex items-center gap-x-1.5 rounded-xl px-3 py-2 transition-all hover:bg-slate-100'
                            }
                            type={'button'}
                            onClick={async () => {
                                append({ label: '' });
                            }}
                        >
                            <span className={'text-[0.93rem] font-bold'}>항목 추가</span>
                            <LuPlus className={'size-6'} />
                        </button>
                    </div>
                </div>
            </div>
            {errors?.firstVoteItem?.message && errors?.firstVoteItem.type === 'required' && (
                <div className={'m-0.5 flex items-center gap-x-1 text-red-700'}>
                    <ExclamationTriangleIcon className={'size-5'} />
                    <p className={'text-sm font-bold'}>첫 번째 투표 항목을 입력해주세요.</p>
                </div>
            )}
            {errors?.secondVoteItem?.message && errors?.secondVoteItem.type === 'required' && (
                <div className={'m-0.5 flex items-center gap-x-1 text-red-700'}>
                    <ExclamationTriangleIcon className={'size-5'} />
                    <p className={'text-sm font-bold'}>두 번째 투표 항목을 입력해주세요.</p>
                </div>
            )}
        </div>
    );
}

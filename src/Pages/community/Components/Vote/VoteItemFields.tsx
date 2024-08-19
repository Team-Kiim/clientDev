import { useEffect, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { HiOutlineExclamationTriangle, HiOutlinePlus, HiXMark } from 'react-icons/hi2';

interface FormData {
    firstVoteItem: string;
    secondVoteItem: string;
    additionalVoteItems: {
        label: string;
    }[];
}

interface Props {
    isVoteEditable: boolean;
}

export default function VoteItemFields({ isVoteEditable }: Props) {
    const { control, register, formState } = useFormContext<FormData>();

    const { errors } = formState;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'additionalVoteItems',
    });

    const [originalVoteItemIdList] = useState(fields.map(item => item.id));

    useEffect(() => {
        if (fields.length === 0) {
            return;
        }
        console.log(fields.length);
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, [fields.length]);

    return (
        <div className={'flex flex-col gap-y-2'}>
            <span className={'mx-1 w-fit text-[0.9rem] font-bold'}>투표 항목</span>
            <div className={'flex flex-col gap-y-3'}>
                <div className={'flex rounded-lg border border-slate-300 px-3.5 py-2.5'}>
                    <input
                        type={'text'}
                        className={
                            'flex-1 text-[0.95rem] placeholder:text-slate-400 focus:outline-none disabled:bg-white disabled:opacity-50'
                        }
                        placeholder={'투표 항목 <1> (필수입력)'}
                        disabled={!isVoteEditable}
                        {...register('firstVoteItem', {
                            required: {
                                value: true,
                                message: '첫 번째 투표 항목을 입력해주세요.',
                            },
                        })}
                    />
                </div>
                <div className={'flex rounded-lg border border-slate-300 px-3.5 py-2.5'}>
                    <input
                        type={'text'}
                        className={
                            'flex-1 text-[0.95rem] placeholder:text-slate-400 focus:outline-none disabled:bg-white disabled:opacity-50'
                        }
                        placeholder={'투표 항목 <2> (필수입력)'}
                        disabled={!isVoteEditable}
                        {...register('secondVoteItem', {
                            required: {
                                value: true,
                                message: '두 번째 투표 항목을 입력해주세요.',
                            },
                        })}
                    />
                </div>
                {fields.map((item, index) => {
                    return (
                        <div key={item.id} className={'flex rounded-lg border border-slate-300 px-3.5 py-2.5'}>
                            <input
                                type={'text'}
                                className={
                                    'flex-1 text-[0.95rem] placeholder:text-slate-400 focus:outline-none disabled:bg-white disabled:opacity-50'
                                }
                                placeholder={`투표 항목 <${index + 3}>`}
                                {...register(`additionalVoteItems.${index}.label` as const)}
                                disabled={originalVoteItemIdList.includes(item.id) && !isVoteEditable}
                            />
                            <button
                                type={'button'}
                                disabled={originalVoteItemIdList.includes(item.id) && !isVoteEditable}
                                onMouseDown={() => {
                                    remove(index);
                                }}
                                className={'disabled:opacity-50'}
                            >
                                <HiXMark className={'size-5'} />
                            </button>
                        </div>
                    );
                })}
                <div className={'flex justify-center'}>
                    <button
                        className={'rounded-full p-1.5 transition-all hover:bg-slate-100'}
                        type={'button'}
                        onClick={async () => {
                            append({ label: '' });
                        }}
                    >
                        <HiOutlinePlus className={'size-6'} />
                    </button>
                </div>
            </div>
            {errors?.firstVoteItem?.message && errors?.firstVoteItem.type === 'required' && (
                <div className={'mx-0.5 flex items-center gap-x-1 text-red-500'}>
                    <HiOutlineExclamationTriangle className={'size-4'} />
                    <p className={'text-[0.85rem]'}>첫 번째 투표 항목을 입력해주세요.</p>
                </div>
            )}
            {errors?.secondVoteItem?.message && errors?.secondVoteItem.type === 'required' && (
                <div className={'mx-0.5 flex items-center gap-x-1 text-red-500'}>
                    <HiOutlineExclamationTriangle className={'size-4'} />
                    <p className={'text-[0.85rem]'}>두 번째 투표 항목을 입력해주세요.</p>
                </div>
            )}
        </div>
    );
}

import { useRef, useState } from 'react';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import Select, { SelectInstance } from 'react-select';
import { CATEGORIES } from '@/Constants/categories.ts';
import { HiOutlineExclamationCircle } from 'react-icons/hi2';
import useCreateSkillChatRoomMutation from '@/Pages/admin/manage/skill_chat_room/Hooks/useCreateSkillChatRoomMutation.tsx';

interface Option {
    label: string;
    value: string;
}

interface FormData {
    parentSkillCategory: string;
    childSkillCategory: string;
}

export default function CreateSkillChatRoomForm() {
    const { control, formState, handleSubmit } = useForm<FormData>({
        defaultValues: {
            parentSkillCategory: 'PROGRAMMING_LANGUAGE',
        },
        mode: 'onBlur',
    });

    const { errors } = formState;

    const childSkillCategorySelectRef = useRef<SelectInstance<Option | null>>(null);

    const parentSkillCategoryOptions: Option[] = CATEGORIES.map(category => ({
        value: category.value,
        label: category.label,
    }));

    const [childSkillCategoryOptions, setChildSkillCategoryOptions] = useState<Option[]>(
        CATEGORIES.find(category => category.value === 'PROGRAMMING_LANGUAGE').childCategories,
    );

    const { field: parentSkillCategoryField } = useController({
        control,
        name: 'parentSkillCategory',
        rules: {
            validate: {
                isNotSelected(value) {
                    return !!value || '상위 카테고리를 선택해주세요.';
                },
            },
        },
    });

    const { field: childSkillCategoryField } = useController({
        control,
        name: 'childSkillCategory',
        rules: {
            validate: {
                isNotSelected(value) {
                    return !!value || '하위 카테고리를 선택해주세요.';
                },
            },
        },
    });

    const { mutate: createSkillChatRoom, isPending } = useCreateSkillChatRoomMutation();

    const onSubmit: SubmitHandler<FormData> = data => {
        const { parentSkillCategory, childSkillCategory } = data;
        createSkillChatRoom({
            parentSkillCategory,
            childSkillCategory,
        });
    };

    return (
        <form className={'flex flex-col gap-y-10'} onSubmit={handleSubmit(onSubmit)}>
            <div className={'flex flex-col gap-y-8'}>
                <div className={'flex flex-col gap-y-2'}>
                    <label className={'mx-1 w-fit text-[0.9rem] font-bold'} htmlFor={'parentSkillCategorySelect'}>
                        상위 카테고리
                        <span className={'text-rose-500'}>﹡</span>
                    </label>
                    <div
                        className={
                            'flex h-11 items-center gap-x-2 rounded-2xl border border-slate-300 px-3.5 py-2.5 transition-all focus-within:border-plump-purple-600'
                        }
                    >
                        <Select
                            inputId={'parentSkillCategorySelect'}
                            placeholder={'상위 카테고리'}
                            options={parentSkillCategoryOptions}
                            onChange={option => {
                                parentSkillCategoryField.onChange(option.value);
                                childSkillCategorySelectRef.current.clearValue();
                                setChildSkillCategoryOptions(
                                    CATEGORIES.find(category => category.value === option.value).childCategories,
                                );
                            }}
                            isSearchable={false}
                            defaultValue={{ value: 'PROGRAMMING_LANGUAGE', label: '프로그래밍 언어' }}
                            onBlur={parentSkillCategoryField.onBlur}
                            styles={{
                                container: base => {
                                    return {
                                        ...base,
                                        flex: 1,
                                    };
                                },
                                valueContainer: base => {
                                    return {
                                        ...base,
                                        padding: 0,
                                    };
                                },

                                placeholder: base => {
                                    return {
                                        ...base,
                                        color: '#9ca3af',
                                    };
                                },
                            }}
                            classNames={{
                                control() {
                                    return `!bg-white !text-[0.85rem] !border-none !shadow-none`;
                                },

                                option() {
                                    return '!text-[0.85rem]';
                                },
                            }}
                        />
                    </div>
                    {errors?.parentSkillCategory?.message && errors?.parentSkillCategory.type === 'isNotSelected' && (
                        <div className={'m-0.5 flex items-center gap-x-1 text-rose-500'}>
                            <HiOutlineExclamationCircle className={'size-5'} />
                            <p className={'text-[0.8rem]'}>{errors.parentSkillCategory.message}</p>
                        </div>
                    )}
                </div>
                <div className={'flex flex-col gap-y-2'}>
                    <label className={'mx-1 w-fit text-[0.9rem] font-bold'} htmlFor={'childSkillCategorySelect'}>
                        하위 카테고리
                        <span className={'text-rose-500'}>﹡</span>
                    </label>
                    <div
                        className={
                            'flex h-11  items-center gap-x-2 rounded-2xl border border-slate-300 px-3.5 py-2.5 transition-all focus-within:border-plump-purple-600'
                        }
                    >
                        <Select
                            ref={childSkillCategorySelectRef}
                            inputId={'childSkillCategorySelect'}
                            placeholder={'하위 카테고리'}
                            options={childSkillCategoryOptions}
                            onChange={option => {
                                if (option === null) {
                                    return;
                                }
                                childSkillCategoryField.onChange(option.value);
                            }}
                            onBlur={childSkillCategoryField.onBlur}
                            styles={{
                                container: base => {
                                    return {
                                        ...base,
                                        flex: 1,
                                    };
                                },
                                valueContainer: base => {
                                    return {
                                        ...base,
                                        padding: 0,
                                    };
                                },

                                placeholder: base => {
                                    return {
                                        ...base,
                                        color: '#9ca3af',
                                    };
                                },
                            }}
                            classNames={{
                                control() {
                                    return `!bg-white !text-[0.85rem] !border-none !shadow-none`;
                                },

                                option() {
                                    return '!text-[0.85rem]';
                                },
                            }}
                        />
                    </div>
                    {errors?.childSkillCategory?.message && errors?.childSkillCategory.type === 'isNotSelected' && (
                        <div className={'m-0.5 flex items-center gap-x-1 text-rose-500'}>
                            <HiOutlineExclamationCircle className={'size-5'} />
                            <p className={'text-[0.8rem]'}>{errors.childSkillCategory.message}</p>
                        </div>
                    )}
                </div>
            </div>
            <button
                className={
                    'flex w-full items-center justify-center rounded-2xl bg-plump-purple-600 py-3 text-[0.9rem] font-bold text-white transition-all hover:bg-plump-purple-700 disabled:opacity-75'
                }
                disabled={isPending}
            >
                기술 채팅방 생성
            </button>
        </form>
    );
}

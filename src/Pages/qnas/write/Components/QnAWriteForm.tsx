import dompurify from 'dompurify';
import { isEqual } from 'lodash';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import TitleInput from '@/Pages/qnas/Components/QnAPostInputs/TitleInput.tsx';
import TextEditor from '@/Pages/qnas/Components/QnAPostInputs/TextEditor.tsx';
import CategorySelector from '@/Pages/qnas/write/Components/Category/CategorySelector.tsx';

interface FormData {
    title: string;
    bodyContent: string;
    keywords: string[];
}

export default function QnAWriteForm() {
    const navigate = useNavigate();

    const [selectedCategories, setSelectedCategories] = useState<
        {
            parentCategory: string;
            childCategory: string;
        }[]
    >([]);

    const formMethods = useForm<FormData>({
        mode: 'onBlur',
        defaultValues: {
            title: '',
            bodyContent: '',
            keywords: [],
        },
    });

    const updateSelectedCategories = (newCategory: { parentCategory: string; childCategory: string }) => {
        for (const category of selectedCategories) {
            // 선택된 카테고리가 이미 존재하는 경우
            if (isEqual(category, newCategory)) {
                setSelectedCategories(
                    selectedCategories.filter(category => {
                        return !isEqual(category, newCategory);
                    }),
                );
                return;
            }
        }
        setSelectedCategories([...selectedCategories, newCategory]);
    };

    const onSubmit: SubmitHandler<FormData> = data => {
        console.log(dompurify.sanitize(data.bodyContent));
    };

    return (
        <FormProvider {...formMethods}>
            <form className={'mt-3 flex flex-col gap-y-10'} onSubmit={formMethods.handleSubmit(onSubmit)}>
                <TitleInput />
                <div className={'flex flex-col gap-y-3'}>
                    <TextEditor />
                </div>
                <CategorySelector
                    updateSelectedCategories={updateSelectedCategories}
                    selectedCategories={selectedCategories}
                />
                <div className={'mb-10 flex w-full justify-end gap-x-3'}>
                    <button
                        className={'rounded-lg px-3 py-2 transition-all hover:bg-violet-50'}
                        type={'button'}
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        <span className={'text-[0.95rem] font-bold text-violet-600'}>취소하기</span>
                    </button>
                    <button
                        className={'rounded-lg bg-violet-600 px-3 py-2 transition-all hover:bg-violet-700'}
                        type={'submit'}
                    >
                        <span className={'text-[0.95rem] font-bold text-white'}>작성하기</span>
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}

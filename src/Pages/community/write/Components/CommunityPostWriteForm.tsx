import dompurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import TitleInput from '@/Pages/Components/PostInputs/TitleInput.tsx';
import TextEditor from '@/Pages/Components/PostInputs/TextEditor.tsx';

interface FormData {
    title: string;
    bodyContent: string;
}

export default function CommunityPostWriteForm() {
    const navigate = useNavigate();

    const formMethods = useForm<FormData>({
        mode: 'onBlur',
        defaultValues: {
            title: '',
            bodyContent: '',
        },
    });

    const onSubmit: SubmitHandler<FormData> = data => {
        console.log(dompurify.sanitize(data.bodyContent));
    };

    return (
        <FormProvider {...formMethods}>
            <form className={'mt-3 flex flex-col gap-y-4'} onSubmit={formMethods.handleSubmit(onSubmit)}>
                <div className={'flex flex-col gap-y-10'}>
                    <TitleInput />
                    <TextEditor />
                </div>
                <div className={'mb-10 flex w-full justify-end gap-x-4'}>
                    <button
                        className={'rounded-lg px-6 py-2.5 transition-all hover:bg-violet-50'}
                        type={'button'}
                        onClick={() => {
                            navigate('/community');
                        }}
                    >
                        <span className={'text-[0.95rem] font-bold text-violet-600'}>취소</span>
                    </button>
                    <button className={'rounded-lg bg-violet-600 px-6 py-2.5 transition-all hover:bg-violet-700'}>
                        <span className={'text-[0.95rem] font-bold text-white'}>작성</span>
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}

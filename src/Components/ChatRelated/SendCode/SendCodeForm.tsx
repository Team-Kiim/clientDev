import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import LanguageSelect from '@/Components/ChatRelated/SendCode/LanguageSelect.tsx';
import SourceCodeField from '@/Components/ChatRelated/SendCode/SourceCodeField.tsx';
import CodeDescriptionField from '@/Components/ChatRelated/SendCode/CodeDescriptionField.tsx';

interface Props {
    closeSendCodeModal(): void;
}

interface FormData {
    language: string;
    sourceCode: string;
    codeDescription: string;
}

export default function SendCodeForm({ closeSendCodeModal }: Props) {
    const formMethods = useForm<FormData>({
        mode: 'onChange',
    });

    const { isSubmitting, isValid } = formMethods.formState;

    const onSubmit: SubmitHandler<FormData> = async data => {
        console.log(data);
        closeSendCodeModal();
    };

    return (
        <form className={'w-full'} onSubmit={formMethods.handleSubmit(onSubmit)}>
            <FormProvider {...formMethods}>
                <div className={'flex w-full gap-x-6'}>
                    <div className={'flex w-2/3 flex-shrink-0 flex-col gap-y-10'}>
                        <LanguageSelect />
                        <SourceCodeField />
                    </div>
                    <div className={'flex w-[calc(33.333333%-1.5rem)] flex-shrink-0 flex-col gap-y-10'}>
                        <CodeDescriptionField />
                        <div className={'flex justify-end gap-x-3'}>
                            <button
                                className={
                                    'rounded-lg bg-slate-100 px-3.5 py-2 text-[0.9rem] font-bold transition-all hover:bg-slate-200'
                                }
                                type={'button'}
                                onClick={closeSendCodeModal}
                            >
                                취소
                            </button>
                            <button
                                className={
                                    'rounded-lg bg-plump-purple-600 px-3.5 py-2 text-[0.9rem] font-bold text-white transition-all enabled:hover:bg-plump-purple-700 disabled:opacity-75'
                                }
                                disabled={isSubmitting || !isValid}
                            >
                                전송
                            </button>
                        </div>
                    </div>
                </div>
            </FormProvider>
        </form>
    );
}

import { useController, useFormContext } from 'react-hook-form';
import Select from 'react-select';
import { GoCode } from 'react-icons/go';

const languageOptions = [
    { value: 'c', label: 'C' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'css', label: 'CSS' },
    { value: 'flutter', label: 'Flutter' },
    { value: 'html', label: 'HTML' },
    { value: 'java', label: 'Java' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'jsx', label: 'JSX' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'php', label: 'PHP' },
    { value: 'python', label: 'Python' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'rust', label: 'Rust' },
    { value: 'sql', label: 'SQL' },
    { value: 'swift', label: 'Swift' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'tsx', label: 'TSX' },
];

interface FormData {
    language: string;
}

export default function LanguageSelect() {
    const { control } = useFormContext<FormData>();

    const { field } = useController({
        control,
        name: 'language',
        rules: {
            validate: {
                isNotSelected(value) {
                    return !!value || '';
                },
            },
        },
    });

    return (
        <div className={'flex flex-col gap-y-2'}>
            <label className={'mx-1 w-fit text-[0.9rem] font-bold'} htmlFor={'languageSelect'}>
                프로그래밍 언어
                <span className={'text-red-500'}>﹡</span>
            </label>
            <div
                className={
                    'flex h-11 w-2/3 items-center gap-x-2 rounded-2xl border border-slate-300 px-3.5 py-2.5 transition-all focus-within:border-plump-purple-600'
                }
            >
                <GoCode className={'size-5 text-slate-500'} />
                <Select
                    placeholder={'프로그래밍 언어'}
                    options={languageOptions}
                    onChange={option => {
                        field.onChange(option.value);
                    }}
                    onBlur={field.onBlur}
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
        </div>
    );
}

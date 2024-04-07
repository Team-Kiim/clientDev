import { useState } from 'react';
import Select from 'react-select';
import SourceCodeInput from '@/Pages/qnas/write/Components/SourceCodeInput.tsx';
import SourceCodePreview from '@/Pages/qnas/write/Components/SourceCodePreview.tsx';

const languageOptions = [
    { value: 'c', label: 'C' },
    { value: 'cpp', label: 'C++' },
    { value: 'csp', label: 'C#' },
    { value: 'java', label: 'Java' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'jsx', label: 'JSX' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'tsx', label: 'TSX' },
    { value: 'markup', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'php', label: 'PHP' },
    { value: 'sql', label: 'SQL' },
    { value: 'go', label: 'Go' },
    { value: 'dart', label: 'Dart' },
    { value: 'matlab', label: 'MATLAB' },
    { value: 'swift', label: 'Swift' },
    { value: 'objectivec', label: 'Objective-C' },
    { value: 'rust', label: 'Rust' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'r', label: 'R' },
    { value: 'perl', label: 'Perl' },
    { value: 'scala', label: 'Scala' },
    { value: 'lisp', label: 'LISP' },
    { value: 'haskell', label: 'Haskell' },
];

export default function SourceCodeSection() {
    const [currentLanguage, setCurrentLanguage] = useState('c');
    const [isSourceCodePreviewMode, setIsSourceCodePreviewMode] = useState(false);

    return (
        <div className={'mt-2'}>
            <div className={'flex justify-between'}>
                <Select
                    isSearchable={false}
                    options={languageOptions}
                    classNames={{
                        control() {
                            return '!rounded-lg !h-[32px] !w-64 !border !border-gray-300 !bg-white !border !text-sm !shadow-none';
                        },

                        option() {
                            return '!text-sm';
                        },
                    }}
                    defaultValue={languageOptions.find(option => option.value === currentLanguage)}
                    onChange={option => {
                        setCurrentLanguage(option.value);
                    }}
                />
                {isSourceCodePreviewMode ? (
                    <button
                        className={'rounded-lg px-2 py-1 transition-all hover:bg-violet-50'}
                        type={'button'}
                        onClick={() => {
                            setIsSourceCodePreviewMode(false);
                        }}
                    >
                        <span className={'font-medium text-violet-600'}>코드 편집</span>
                    </button>
                ) : (
                    <button
                        className={'rounded-lg px-2 py-1 transition-all hover:bg-violet-50'}
                        type={'button'}
                        onClick={() => {
                            setIsSourceCodePreviewMode(true);
                        }}
                    >
                        <span className={'font-medium text-violet-600'}>미리보기</span>
                    </button>
                )}
            </div>
            {isSourceCodePreviewMode ? <SourceCodePreview currentLanguage={currentLanguage} /> : <SourceCodeInput />}
        </div>
    );
}

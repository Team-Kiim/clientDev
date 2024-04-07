import { useFormContext } from 'react-hook-form';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ghcolors } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Props {
    currentLanguage: string;
}

export default function SourceCodePreview({ currentLanguage }: Props) {
    const { getValues } = useFormContext<{ sourceCode: string }>();

    const sourceCode = getValues('sourceCode');

    return (
        <>
            <div className={'sourceCode mt-2 h-[35rem] rounded-lg'}>
                <SyntaxHighlighter
                    customStyle={{ borderRadius: '0.5rem', height: '35rem' }}
                    language={currentLanguage}
                    style={ghcolors}
                >
                    {sourceCode}
                </SyntaxHighlighter>
            </div>
        </>
    );
}

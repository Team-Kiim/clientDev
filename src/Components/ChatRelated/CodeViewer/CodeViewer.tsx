import { toast } from 'react-toastify';
import { LuCopy } from 'react-icons/lu';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import TOAST_OPTIONS from '@/Constants/toastOptions.ts';
import 'react-toastify/dist/ReactToastify.css';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface Props {
    language: string;
    sourceCode: string;
}

export default function CodeViewer({ language, sourceCode }: Props) {
    return (
        <div className={'flex w-full flex-col gap-y-2'}>
            <span className={'mx-1 text-[0.9rem] font-bold text-slate-800'}>소스 코드</span>
            <div className={'relative flex h-[35rem] w-full flex-col gap-y-2 rounded-lg bg-[#24273a]'}>
                <div
                    className={
                        'sticky top-0 flex w-full justify-between rounded-t-lg bg-[#24273a]/40 px-4 py-2.5 backdrop-blur-md'
                    }
                >
                    <span className={'text-[0.9rem] font-bold text-white'}>{language}</span>
                    <div>
                        <CopyToClipboard
                            text={sourceCode}
                            onCopy={() => {
                                toast.success(<p className={'text-[0.85rem]'}>클립보드에 복사되었습니다.</p>, {
                                    ...TOAST_OPTIONS,
                                    position: 'top-center',
                                });
                            }}
                        >
                            <button type={'button'}>
                                <LuCopy className={'size-5 text-white'} />
                            </button>
                        </CopyToClipboard>
                    </div>
                </div>
                <div className={'min-h-0 flex-1 overflow-x-auto overflow-y-auto overscroll-y-contain px-3'}>
                    <SyntaxHighlighter
                        language={language.toLowerCase()}
                        showLineNumbers={true}
                        customStyle={{
                            padding: 0,
                            backgroundColor: '#24273a',
                            height: '100%',
                            margin: 0,
                            fontSize: '0.9rem',
                        }}
                        style={dracula}
                    >
                        {sourceCode}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>
    );
}

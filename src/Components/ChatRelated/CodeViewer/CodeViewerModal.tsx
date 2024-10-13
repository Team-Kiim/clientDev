import Modal from 'react-modal';
import { GoX } from 'react-icons/go';
import CodeViewer from '@/Components/ChatRelated/CodeViewer/CodeViewer.tsx';

interface Props {
    isCodeViewerModalOpen: boolean;
    closeCodeViewerModal(): void;
    sourceCode: string;
    language: string;
    codeDescription: string;
}

export default function CodeViewerModal({
    isCodeViewerModalOpen,
    closeCodeViewerModal,
    sourceCode,
    language,
    codeDescription,
}: Props) {
    console.log(codeDescription);
    return (
        <Modal
            isOpen={isCodeViewerModalOpen}
            className={
                'fixed left-1/2 top-1/2 h-[49rem] w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-2'
            }
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 50%)',
                    zIndex: 60,
                },
            }}
            closeTimeoutMS={280}
            shouldCloseOnOverlayClick={false}
        >
            <div className={'h-full w-full overflow-y-auto p-4'}>
                <div className={'flex justify-end'}>
                    <button
                        className={'rounded-full p-1 transition-all hover:bg-slate-100'}
                        type={'button'}
                        onClick={() => {
                            closeCodeViewerModal();
                        }}
                    >
                        <GoX className={'size-8 text-slate-800'} />
                    </button>
                </div>
                <div className={'flex flex-col gap-y-5'}>
                    <div className={'flex w-full flex-col gap-y-2'}>
                        <span className={'mx-1 text-[0.9rem] font-bold text-slate-800'}>코드 설명</span>
                        <p className={'mx-1 text-[0.8rem] text-slate-500'}>
                            이 코드는 리액트에 관한 코드입니다. 이 코드는 리액트에 관한 코드입니다. 이 코드는 리액트에
                            관한 코드입니다. 이 코드는 리액트에 관한 코드입니다. 이 코드는 리액트에 관한 코드입니다. 이
                            코드는 리액트에 관한 코드입니다.
                        </p>
                    </div>
                    <hr />
                    <CodeViewer language={language} sourceCode={sourceCode} />
                </div>
            </div>
        </Modal>
    );
}

import Modal from 'react-modal';
import { HiXMark } from 'react-icons/hi2';
import WhiteboardEditor from '@/Pages/qnas/Components/Whiteboard/WhiteboardEditor.tsx';

interface Props {
    isWhiteboardEditorModalOpen: boolean;
    closeWhiteboardEditorModal(): void;
    canvasDataJSONString: string;
    updateCanvasDataJSONString(newCanvasDataJSONString: string): void;
}

export default function WhiteboardEditorModal({
    isWhiteboardEditorModalOpen,
    closeWhiteboardEditorModal,
    canvasDataJSONString,
    updateCanvasDataJSONString,
}: Props) {
    return (
        <Modal
            isOpen={isWhiteboardEditorModalOpen}
            className={
                'fixed left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 flex-col gap-y-5 rounded-xl bg-white p-4'
            }
            style={{
                overlay: {
                    zIndex: 60,
                },
            }}
            closeTimeoutMS={280}
        >
            <div className={'flex justify-end'}>
                <button
                    className={'rounded-full p-1.5 transition-all hover:bg-gray-100'}
                    type={'button'}
                    onClick={closeWhiteboardEditorModal}
                >
                    <HiXMark className={'size-7'} />
                </button>
            </div>
            <div className={'h-full w-full'}>
                <WhiteboardEditor
                    closeWhiteboardEditorModal={closeWhiteboardEditorModal}
                    canvasDataJSONString={canvasDataJSONString}
                    updateCanvasDataJSONString={updateCanvasDataJSONString}
                />
            </div>
        </Modal>
    );
}

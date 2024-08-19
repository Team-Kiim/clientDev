import { useReducer } from 'react';
import WhiteboardViewer from '@/Pages/qnas/Components/Whiteboard/WhiteboardViewer.tsx';
import WhiteboardEditorModal from '@/Pages/qnas/Components/Whiteboard/WhiteboardEditorModal.tsx';

interface Props {
    canvasDataJSONString: string;
    updateCanvasDataJSONString(newCanvasDataJSONString: string): void;
}

export default function WhiteboardSection({ canvasDataJSONString, updateCanvasDataJSONString }: Props) {
    const [isWhiteboardEditorModalOpen, toggleIsWhiteboardEditorModalOpen] = useReducer(state => !state, false);

    return (
        <>
            <div className={'flex w-full flex-col gap-y-2'}>
                <span className={'mx-1 w-fit text-[0.9rem] font-bold'}>시각자료</span>
                <WhiteboardViewer
                    canvasData={JSON.parse(canvasDataJSONString)}
                    openWhiteboardEditorModal={toggleIsWhiteboardEditorModalOpen}
                />
            </div>
            <WhiteboardEditorModal
                isWhiteboardEditorModalOpen={isWhiteboardEditorModalOpen}
                closeWhiteboardEditorModal={toggleIsWhiteboardEditorModalOpen}
                canvasDataJSONString={canvasDataJSONString}
                updateCanvasDataJSONString={updateCanvasDataJSONString}
            />
        </>
    );
}

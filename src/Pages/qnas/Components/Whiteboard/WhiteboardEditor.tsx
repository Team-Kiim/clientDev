import { Excalidraw, MainMenu } from '@excalidraw/excalidraw';
import { useState } from 'react';
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';

interface Props {
    closeWhiteboardEditorModal(): void;
    canvasDataJSONString: string;
    updateCanvasDataJSONString(newCanvasDataJSONString: string): void;
}

export default function WhiteboardEditor({
    closeWhiteboardEditorModal,
    canvasDataJSONString,
    updateCanvasDataJSONString,
}: Props) {
    const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>(null);
    const canvasData = JSON.parse(canvasDataJSONString);

    return (
        <Excalidraw
            excalidrawAPI={api => {
                setExcalidrawAPI(api);
            }}
            langCode={'ko-KR'}
            UIOptions={{
                tools: {
                    image: false,
                },
                canvasActions: {
                    saveAsImage: false,
                },
            }}
            initialData={{
                elements: canvasData,
                scrollToContent: true,
            }}
        >
            <MainMenu>
                <MainMenu.Item
                    onSelect={() => {
                        excalidrawAPI.resetScene();
                    }}
                >
                    <span className={'font-bold text-slate-500'}>캔버스 초기화하기</span>
                </MainMenu.Item>
                <MainMenu.Item
                    onSelect={() => {
                        updateCanvasDataJSONString(JSON.stringify(excalidrawAPI.getSceneElements()));
                        closeWhiteboardEditorModal();
                    }}
                >
                    <span className={'font-bold text-slate-500'}>저장후 나가기</span>
                </MainMenu.Item>
            </MainMenu>
        </Excalidraw>
    );
}

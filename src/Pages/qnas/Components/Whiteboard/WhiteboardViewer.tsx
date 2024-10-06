import { useEffect, useState } from 'react';
import { Excalidraw, MainMenu } from '@excalidraw/excalidraw';
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';

interface Props {
    canvasData: object;
    openWhiteboardEditorModal(): void;
}

export default function WhiteboardViewer({ canvasData, openWhiteboardEditorModal }: Props) {
    const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>(null);

    useEffect(() => {
        if (excalidrawAPI) {
            excalidrawAPI.updateScene({
                elements: canvasData as ExcalidrawElement[],
            });

            excalidrawAPI.scrollToContent(canvasData as ExcalidrawElement[], {
                fitToViewport: true,
            });
        }
    }, [canvasData, excalidrawAPI]);

    return (
        <div className={'h-[34rem] rounded-lg border border-slate-300 p-2'}>
            <Excalidraw
                excalidrawAPI={api => {
                    setExcalidrawAPI(api);
                }}
                initialData={{
                    elements: canvasData as ExcalidrawElement[],
                    scrollToContent: true,
                }}
                langCode={'ko-KR'}
                viewModeEnabled={true}
                // 이 코드 작성 이유
                // 아래 클래스가 가진 버튼의 타입이 button 이 아니어서, 폼에서 사용하면 제출됨.
                // (애초에 코드에 type=button 코드가 없음)
                onScrollChange={() => {
                    if (document.querySelector('.scroll-back-to-content')) {
                        (document.querySelector('.scroll-back-to-content') as HTMLButtonElement).type = 'button';
                    }
                }}
            >
                <MainMenu>
                    <MainMenu.Item onSelect={() => openWhiteboardEditorModal()}>시각자료 첨부/수정하기</MainMenu.Item>
                </MainMenu>
            </Excalidraw>
        </div>
    );
}

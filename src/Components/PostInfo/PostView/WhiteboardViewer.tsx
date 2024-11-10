import { Excalidraw, MainMenu } from '@excalidraw/excalidraw';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { useEffect, useState } from 'react';
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';

interface Props {
    visualData: object;
}

export default function WhiteboardViewer({ visualData }: Props) {
    const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>(null);

    useEffect(() => {
        if (excalidrawAPI) {
            excalidrawAPI.scrollToContent(visualData as ExcalidrawElement[], {
                fitToViewport: true,
            });
        }
    }, [excalidrawAPI]);

    useEffect(() => {
        if (excalidrawAPI) {
            excalidrawAPI.updateScene({
                elements: visualData as ExcalidrawElement[],
            });
        }
    }, [visualData]);

    useEffect(() => {
        if (excalidrawAPI) {
            excalidrawAPI.history.clear();
        }
    }, [excalidrawAPI]);

    useEffect(() => {
        if (excalidrawAPI) {
            console.log(excalidrawAPI.getSceneElements());
        }
    }, [excalidrawAPI]);

    return (
        <div className={'h-[34rem] rounded-xl border border-slate-200 p-2'}>
            <Excalidraw
                excalidrawAPI={api => {
                    setExcalidrawAPI(api);
                }}
                langCode={'ko-KR'}
                initialData={{
                    elements: visualData as ExcalidrawElement[],
                    scrollToContent: true,
                }}
                viewModeEnabled={true}
                onScrollChange={() => {
                    if (document.querySelector('.scroll-back-to-content')) {
                        (document.querySelector('.scroll-back-to-content') as HTMLButtonElement).type = 'button';
                    }
                }}
            >
                <MainMenu>
                    <MainMenu.Item onSelect={() => {}}>
                        <a
                            className={'!text-plump-purple-600'}
                            href={'https://github.com/excalidraw/excalidraw'}
                            target={'_blank'}
                        >
                            Excalidraw 깃허브
                        </a>
                    </MainMenu.Item>
                </MainMenu>
            </Excalidraw>
        </div>
    );
}

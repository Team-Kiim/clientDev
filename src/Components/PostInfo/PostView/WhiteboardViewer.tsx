import { Excalidraw, MainMenu } from '@excalidraw/excalidraw';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';

interface Props {
    visualData: object;
}

export default function WhiteboardViewer({ visualData }: Props) {
    return (
        <div className={'h-[34rem] rounded-xl border border-slate-200 p-2'}>
            <Excalidraw
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

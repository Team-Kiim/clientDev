import { useEffect, useState } from 'react';
import { Excalidraw, MainMenu } from '@excalidraw/excalidraw';
import { RiMenuLine } from 'react-icons/ri';
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';

interface Props {
    canvasData: object;
    openWhiteboardEditorModal(): void;
}

export default function WhiteboardViewer({ canvasData, openWhiteboardEditorModal }: Props) {
    const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>(null);

    useEffect(() => {
        if (excalidrawAPI) {
            const sceneData = {
                elements: canvasData,
            };
            excalidrawAPI.updateScene(sceneData);

            // @ts-ignore
            excalidrawAPI.scrollToContent(canvasData, { fitToViewport: true });
        }
    }, [canvasData, excalidrawAPI]);

    return (
        <div className={'flex w-full flex-col gap-y-2'}>
            <h3 className={'mx-1 text-[0.95rem] font-bold'}>시각 자료</h3>
            <div className={'flex flex-col gap-y-2'}>
                <div className={'h-[35rem] rounded-lg border border-slate-300 p-2'}>
                    <Excalidraw
                        excalidrawAPI={api => {
                            setExcalidrawAPI(api);
                        }}
                        langCode={'ko-KR'}
                        viewModeEnabled={true}
                        // 이 코드 작성 이유
                        // 아래 클래스가 가진 버튼의 타입이 button 이 아니어서, 폼에서 사용하면 제출됨.
                        // (애초에 코드에 type=button 코드가 없음)
                        onScrollChange={() => {
                            if (document.querySelector('.scroll-back-to-content')) {
                                (document.querySelector('.scroll-back-to-content') as HTMLButtonElement).type =
                                    'button';
                            }
                        }}
                    >
                        <MainMenu>
                            <MainMenu.Item onSelect={() => openWhiteboardEditorModal()}>
                                시각자료 첨부/수정하기
                            </MainMenu.Item>
                        </MainMenu>
                    </Excalidraw>
                </div>
                <ul className={'ml-5 flex list-disc flex-col gap-y-1 text-[0.87rem] font-bold text-slate-400'}>
                    <li>
                        <div className={'flex items-center gap-x-2'}>
                            <p>아래</p>
                            <RiMenuLine />
                            <p>버튼을 눌러, 시각자료를 첨부/수정해 보세요.</p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>라이브러리는 다운받아서 사용해주세요.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

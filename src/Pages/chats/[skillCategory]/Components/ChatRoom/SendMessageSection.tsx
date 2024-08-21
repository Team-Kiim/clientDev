import { KeyboardEventHandler, useEffect, useRef } from 'react';
import { GoCodeSquare, GoImage } from 'react-icons/go';

export default function SendMessageSection() {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = event => {
        if (event.nativeEvent.isComposing) {
            return;
        }

        if (event.key === 'Enter' && event.shiftKey) {
            return;
        }

        if (event.key === 'Enter') {
            const $textAreaElement = event.target as HTMLTextAreaElement;
            event.preventDefault();
            // 채팅 보내기
            $textAreaElement.value = '';
        }
    };

    useEffect(() => {
        textAreaRef.current.focus();
    }, []);

    return (
        <div className={'flex items-center gap-x-2 border-t border-slate-200 px-3 py-3'}>
            <div className={'flex items-center gap-x-2'}>
                <button className={'rounded-full p-1 transition-all hover:bg-slate-100'} type={'button'}>
                    <GoImage className={'size-6 text-slate-500'} />
                </button>
                <button className={'rounded-full p-1 transition-all hover:bg-slate-100'} type={'button'}>
                    <GoCodeSquare className={'size-6 text-slate-500'} />
                </button>
            </div>
            <div className={'flex flex-1 items-center'}>
                <textarea
                    ref={textAreaRef}
                    placeholder={'메시지를 입력하세요..'}
                    className={
                        'w-full resize-none rounded-xl border border-slate-200 px-3 py-1.5 text-[0.85rem] placeholder:text-slate-400 focus:outline-none'
                    }
                    onKeyDown={handleKeyDown}
                    rows={1}
                />
            </div>
        </div>
    );
}

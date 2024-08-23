import { KeyboardEventHandler } from 'react';
import { GoCodeSquare, GoImage } from 'react-icons/go';

interface Props {
    chatRoomId: string | number;
}

export default function ChatSendSection({ chatRoomId }: Props) {
    const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = event => {
        if (event.nativeEvent.isComposing) {
            return;
        }

        if (event.key === 'Enter' && event.shiftKey) {
            return;
        } else if (event.key === 'Enter') {
            const $textAreaElement = event.target as HTMLTextAreaElement;
            console.log($textAreaElement.value);
            event.preventDefault();
            $textAreaElement.value = '';
        }
    };

    return (
        <div className={'flex items-center gap-x-2 border-t border-slate-200 px-3 pt-2'}>
            <div className={'flex items-center gap-x-2'}>
                <button className={'rounded-full p-1 hover:bg-slate-100'} type={'button'}>
                    <GoImage className={'size-6 text-slate-500'} />
                </button>
                <button className={'rounded-full p-1 hover:bg-slate-100'}>
                    <GoCodeSquare className={'size-6 text-slate-500'} />
                </button>
            </div>
            <div className={'flex flex-1 items-center'}>
                <textarea
                    placeholder={'메시지를 입력하세요..'}
                    className={
                        'w-full resize-none rounded-xl border border-slate-200 px-4 py-1.5 text-[0.8rem] placeholder:text-slate-400 focus:outline-none'
                    }
                    onKeyDown={handleKeyDown}
                    rows={1}
                />
            </div>
        </div>
    );
}

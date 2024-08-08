import { KeyboardEventHandler } from 'react';
import { HiOutlineCodeBracket, HiOutlinePhoto } from 'react-icons/hi2';

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
        <div className={'flex items-center gap-x-2 px-3'}>
            <div className={'flex items-center gap-x-2'}>
                <button className={'rounded-full p-1 hover:bg-slate-100'} type={'button'}>
                    <HiOutlinePhoto className={'size-6'} />
                </button>
                <button className={'rounded-full p-1 hover:bg-slate-100'}>
                    <HiOutlineCodeBracket className={'size-6'} />
                </button>
            </div>
            <div className={'flex flex-1 items-center'}>
                <textarea
                    placeholder={'메시지를 입력하세요..'}
                    className={
                        'w-full resize-none rounded-3xl border border-slate-200 px-3 py-1.5 text-[0.85rem] focus:outline-none'
                    }
                    onKeyDown={handleKeyDown}
                    rows={1}
                />
            </div>
        </div>
    );
}

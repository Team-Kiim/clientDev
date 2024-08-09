import { KeyboardEventHandler, useRef } from 'react';

interface Props {
    updateSearchTerm(searchTerm: string): void;
}

export default function ChatRoomSearchInput({ updateSearchTerm }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
        if (event.nativeEvent.isComposing) {
            return;
        }

        if (event.code === 'Enter') {
            const inputValue = inputRef.current.value;
            updateSearchTerm(inputValue);
        }
    };

    return (
        <div className={'w-full px-4'}>
            <div
                className={
                    'rounded-xl border border-slate-300 px-3 py-1.5 transition-all focus-within:border-violet-700'
                }
            >
                <input
                    className={'w-full bg-white text-[0.9rem] focus:outline-none'}
                    onKeyDown={handleKeyDown}
                    type={'text'}
                    placeholder={'검색어를 입력해주세요.'}
                    autoComplete={'off'}
                    autoCapitalize={'off'}
                    ref={inputRef}
                />
            </div>
        </div>
    );
}

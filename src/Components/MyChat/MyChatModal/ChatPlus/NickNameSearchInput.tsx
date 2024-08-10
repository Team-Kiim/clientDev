import { KeyboardEventHandler, useRef } from 'react';

interface Props {
    updateNickNameToSearch(nickName: string): void;
}

export default function NickNameSearchInput({ updateNickNameToSearch }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
        if (event.nativeEvent.isComposing) {
            return;
        }

        if (event.code === 'Enter') {
            const nickName = inputRef.current.value;
            updateNickNameToSearch(nickName);
        }
    };

    return (
        <div className={'flex-1'}>
            <div
                className={
                    'rounded-2xl border border-slate-300 px-3 py-1 transition-all focus-within:border-violet-700'
                }
            >
                <input
                    className={'w-full bg-white text-[0.8rem] font-bold focus:outline-none'}
                    onKeyDown={handleKeyDown}
                    type={'text'}
                    placeholder={'닉네임 검색'}
                    autoComplete={'off'}
                    autoCapitalize={'off'}
                    ref={inputRef}
                />
            </div>
        </div>
    );
}

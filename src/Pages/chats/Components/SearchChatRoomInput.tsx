import { KeyboardEventHandler, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HiMagnifyingGlass } from 'react-icons/hi2';

export default function SearchChatRoomInput() {
    const inputRef = useRef<HTMLInputElement>(null);

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = searchParams.get('skill') ?? '';
        }
    }, [searchParams]);

    const updateSearchParams = (value: string) => {
        if (value === '') {
            searchParams.delete('skill');
        } else if (value.trim().length !== 0) {
            searchParams.set('skill', value);
        }
        setSearchParams(searchParams);
    };

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
        if (event.nativeEvent.isComposing) {
            return;
        }

        if (event.code === 'Enter') {
            const skillToSearch = inputRef.current.value;
            updateSearchParams(skillToSearch);
        }
    };

    const handleSearchButtonClick = () => {
        const skillToSearch = inputRef.current.value;
        updateSearchParams(skillToSearch);
    };

    return (
        <div className={'flex w-full gap-x-2 rounded-xl border border-slate-300 px-4 py-2'}>
            <input
                className={
                    'min-w-0 flex-1 text-[0.85rem] text-neutral-800 placeholder:text-slate-400 focus:outline-none'
                }
                type={'text'}
                onKeyDown={handleKeyDown}
                placeholder={'기술명으로 채팅방 검색'}
                autoComplete={'off'}
                autoCapitalize={'none'}
                ref={inputRef}
            />
            <button type={'button'} onClick={handleSearchButtonClick}>
                <HiMagnifyingGlass className={'size-5 text-neutral-800'} />
            </button>
        </div>
    );
}

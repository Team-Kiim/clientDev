import { KeyboardEventHandler, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HiMagnifyingGlass } from 'react-icons/hi2';

export default function UserSearchInput() {
    const inputRef = useRef<HTMLInputElement>(null);

    const [searchParams, setSearchParams] = useSearchParams();

    const updateSearchParams = (key: string, value: string) => {
        searchParams.set(key, value);
        setSearchParams(searchParams);
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = searchParams.get('search') ?? '';
        }
    }, [searchParams]);

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
        if (event.nativeEvent.isComposing) {
            return;
        }

        if (event.code === 'Enter') {
            const nicknameToSearch = inputRef.current.value;
            if (nicknameToSearch.trim().length !== 0) {
                updateSearchParams('search', nicknameToSearch);
            }
        }
    };

    const handleSearchButtonClick = () => {
        const nicknameToSearch = inputRef.current.value;
        if (nicknameToSearch.trim().length !== 0) {
            updateSearchParams('search', nicknameToSearch);
        }
    };

    return (
        <div className={'flex w-72 gap-x-2 rounded-xl border border-slate-200 px-3 py-2 shadow-inner'}>
            <input
                className={'flex-1 text-[0.8rem] focus:outline-none'}
                type={'text'}
                onKeyDown={handleKeyDown}
                placeholder={'사용자 검색'}
                autoComplete={'off'}
                autoCapitalize={'none'}
                ref={inputRef}
            />
            <button type={'button'} onClick={handleSearchButtonClick}>
                <HiMagnifyingGlass className={'size-5 text-neutral-800 drop-shadow-[0px_1px_1px]'} />
            </button>
        </div>
    );
}

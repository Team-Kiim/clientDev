import { KeyboardEventHandler, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HiMagnifyingGlass } from 'react-icons/hi2';

export default function PostSearchInput() {
    const inputRef = useRef<HTMLInputElement>(null);

    const [searchParams, setSearchParams] = useSearchParams();

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
        if (event.nativeEvent.isComposing) {
            return;
        }

        if (event.code === 'Enter') {
            const postTitleToSearch = inputRef.current.value;
            if (postTitleToSearch.trim().length !== 0) {
                searchParams.set('post-title', postTitleToSearch);
                setSearchParams(searchParams);
            }
        }
    };

    const handleSearchButtonClick = () => {
        const postTitleToSearch = inputRef.current.value;
        if (postTitleToSearch.trim().length !== 0) {
            searchParams.set('post-title', postTitleToSearch);
            setSearchParams(searchParams);
        }
    };

    return (
        <div className={'flex w-72 gap-x-2 rounded-3xl border border-slate-200 px-3 py-2'}>
            <input
                className={'flex-1 text-[0.8rem] focus:outline-none'}
                type={'text'}
                onKeyDown={handleKeyDown}
                placeholder={'게시글 제목 검색'}
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

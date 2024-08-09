import { KeyboardEventHandler, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HiMagnifyingGlass } from 'react-icons/hi2';

export default function PostSearchInput() {
    const inputRef = useRef<HTMLInputElement>(null);

    const [searchParams, setSearchParams] = useSearchParams();

    const updateSearchParams = () => {
        const searchKeyword = inputRef.current.value;
        if (searchKeyword === '') {
            searchParams.delete('post_keyword');
        } else {
            searchParams.set('post_keyword', searchKeyword);
        }
        setSearchParams(searchParams);
    };

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
        if (event.nativeEvent.isComposing) {
            return;
        }

        if (event.code === 'Enter') {
            updateSearchParams();
        }
    };

    const handleSearchButtonClick = () => {
        updateSearchParams();
    };

    useEffect(() => {
        inputRef.current.value = searchParams.get('post_keyword') ?? '';
    }, [searchParams]);

    return (
        <div
            className={
                'flex w-[36rem] items-center gap-x-2.5 rounded-3xl border border-slate-100 bg-slate-100 px-5 py-2'
            }
        >
            <input
                className={'flex-1 bg-slate-100 text-sm font-bold focus:outline-none'}
                onKeyDown={handleKeyDown}
                type={'text'}
                placeholder={'게시글 검색'}
                autoComplete={'off'}
                autoCapitalize={'off'}
                ref={inputRef}
            />
            <div className={'tooltip tooltip-bottom flex items-center'} data-tip={'검색'}>
                <button type={'button'} onClick={handleSearchButtonClick}>
                    <HiMagnifyingGlass className={'size-6'} />
                </button>
            </div>
        </div>
    );
}

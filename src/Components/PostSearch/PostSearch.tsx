import { debounce } from 'lodash';
import { KeyboardEventHandler, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowPathIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function PostSearch() {
    const inputRef = useRef<HTMLInputElement>(null);

    const [searchParams, setSearchParams] = useSearchParams();

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = debounce(event => {
        if (event.nativeEvent.isComposing) {
            return;
        }

        if (event.code === 'Enter') {
            if (inputRef.current.value === '') {
                return;
            }
            const inputValue = inputRef.current.value;
            searchParams.set('post_title', inputValue);
            setSearchParams(searchParams);
        }
    }, 250);

    useEffect(() => {
        inputRef.current.value = searchParams.get('post_title') ?? '';
    }, [searchParams]);

    return (
        <div className={'flex w-[30rem] items-center gap-x-2.5 rounded-3xl bg-gray-100 px-5 py-2.5'}>
            <MagnifyingGlassIcon className={'size-6'} />
            <input
                className={'flex-1 bg-gray-100 text-[0.9rem] focus:outline-none'}
                onKeyDown={handleKeyDown}
                type={'search'}
                placeholder={'게시글 검색'}
                autoComplete={'off'}
                autoCapitalize={'off'}
                ref={inputRef}
            />
            <div className={'tooltip tooltip-bottom'} data-tip={'초기화'}>
                <button
                    className={'flex items-center transition-all hover:scale-110'}
                    type={'button'}
                    onClick={() => {
                        if (!searchParams.has('post_title')) {
                            return;
                        }
                        searchParams.delete('post_title');
                        setSearchParams(searchParams);
                    }}
                >
                    <ArrowPathIcon className={'size-6'} />
                </button>
            </div>
        </div>
    );
}

import { debounce } from 'lodash';
import { KeyboardEventHandler, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowPathIcon, HashtagIcon } from '@heroicons/react/24/outline';

export default function KeywordSearchInput() {
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
            console.log(searchParams);
            const inputValue = inputRef.current.value;
            searchParams.set('keyword', inputValue);
            setSearchParams(searchParams);
        }
    });

    useEffect(() => {
        inputRef.current.value = searchParams.get('keyword');
    }, [searchParams]);

    return (
        <div className={'flex items-center gap-x-1 rounded-2xl border border-gray-300 px-4'}>
            <HashtagIcon className={'size-5'} />
            <input
                className={'flex-1 bg-white text-[0.85rem] focus:outline-none'}
                onKeyDown={handleKeyDown}
                placeholder={'키워드 검색'}
                autoComplete={'off'}
                autoCapitalize={'off'}
                ref={inputRef}
            />
            <div className={'tooltip tooltip-bottom'} data-tip={'키워드 삭제'}>
                <button
                    className={'flex items-center transition-all hover:scale-110'}
                    type={'button'}
                    onClick={() => {
                        if (!searchParams.has('keyword')) {
                            return;
                        }
                        searchParams.delete('keyword');
                        setSearchParams(searchParams);
                    }}
                >
                    <ArrowPathIcon className={'size-5'} />
                </button>
            </div>
        </div>
    );
}

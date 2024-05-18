import { debounce } from 'lodash';
import { KeyboardEventHandler, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowPathIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function PostSearch() {
    const inputRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const { pathname } = useLocation();

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
            if (pathname.includes('qnas')) {
                navigate(`/qnas?${searchParams.toString()}`);
            } else {
                navigate(`/?${searchParams.toString()}`);
            }
        }
    }, 250);

    useEffect(() => {
        inputRef.current.value = searchParams.get('post_title') ?? '';
    }, [searchParams]);

    return (
        <div
            className={
                'flex w-[36rem] items-center gap-x-2.5 rounded-2xl border border-gray-300 bg-white px-4 py-1.5 transition-all focus-within:border-gray-700 hover:border-gray-700'
            }
        >
            <MagnifyingGlassIcon className={'size-6'} />
            <input
                className={'flex-1 bg-white text-[0.9rem] focus:outline-none'}
                onKeyDown={handleKeyDown}
                type={'search'}
                placeholder={'게시글 검색'}
                autoComplete={'off'}
                autoCapitalize={'off'}
                ref={inputRef}
            />
            <div className={'tooltip tooltip-bottom'} data-tip={'초기화'}>
                <button
                    className={'flex items-center rounded-full p-1 '}
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

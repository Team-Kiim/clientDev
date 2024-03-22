import { debounce } from 'lodash';
import { KeyboardEventHandler, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function PostSearch() {
    const inputRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = debounce(event => {
        if (event.nativeEvent.isComposing) {
            return;
        }

        if (event.code === 'Enter') {
            if (inputRef.current.value === '') {
                return;
            }
            const inputValue = inputRef.current.value;
            console.log(inputValue);
        }
    }, 250);

    return (
        <div className={'flex w-[34rem] gap-x-2.5 rounded-3xl bg-gray-100 px-4 py-2.5'}>
            <MagnifyingGlassIcon className={'size-6'} />
            <input
                className={'flex-1 bg-gray-100 focus:outline-none'}
                onKeyDown={handleKeyDown}
                type={'search'}
                placeholder={'게시글 검색'}
                autoComplete={'off'}
                autoCapitalize={'off'}
                ref={inputRef}
            />
        </div>
    );
}

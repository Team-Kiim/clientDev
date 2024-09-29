import { debounce } from 'lodash';
import { ChangeEventHandler, useCallback, useEffect, useRef } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';

interface Props {
    searchCriteria: string;
    updateQuery(query: string): void;
}

export default function SearchCorpInfoInput({ searchCriteria, updateQuery }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const debouncedUpdateQuery = useCallback(
        debounce((query: string) => {
            updateQuery(query);
        }, 200),
        [],
    );

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = event => {
        const query = event.target.value;
        debouncedUpdateQuery(query);
    };

    useEffect(() => {
        updateQuery('');
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }, [searchCriteria]);

    return (
        <div className={'flex items-center gap-x-2 rounded-2xl border border-slate-300 px-3 py-3.5 '}>
            <HiMagnifyingGlass className={'size-5 text-slate-800'} />
            <input
                type={'text'}
                className={'flex-1 text-[0.9rem] placeholder:text-slate-400 focus:outline-none'}
                placeholder={`${searchCriteria === 'corpName' ? '회사명' : '도메인'}으로 검색`}
                autoComplete={'off'}
                autoCapitalize={'off'}
                onChange={handleInputChange}
                ref={inputRef}
            />
        </div>
    );
}

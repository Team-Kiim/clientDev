import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PiHashStraight } from 'react-icons/pi';
import { HiOutlineArrowPath, HiXMark } from 'react-icons/hi2';

export default function SetPostHashtagSection() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [inputValue, setInputValue] = useState('');

    const hashtagList = searchParams.getAll('tag');

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = event => {
        if (event.target.value === ' ') {
            return;
        }

        setInputValue(event.target.value);
    };

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
        if (event.nativeEvent.isComposing) {
            return;
        }

        if (event.code === 'Enter') {
            if (inputValue !== '') {
                searchParams.append('tag', inputValue);
                setSearchParams(searchParams);
                setInputValue('');
            }
        }
    };

    const handleDeleteHashtagButtonClick = (hashtagToDelete: string) => {
        searchParams.delete('tag');
        for (const hashtag of hashtagList) {
            if (hashtag !== hashtagToDelete) {
                searchParams.append('tag', hashtag);
            }
        }
        setSearchParams(searchParams);
    };

    return (
        <div
            className={
                'flex w-3/5 flex-shrink-0 flex-wrap items-center gap-x-2 rounded-lg border border-slate-200 px-3 scrollbar-hide'
            }
        >
            <PiHashStraight className={'size-7 text-plump-purple-600'} />
            <ul
                className={
                    'flex h-11 min-w-0 flex-1 flex-wrap justify-start gap-2 overflow-y-auto overscroll-y-contain py-2 scrollbar-hide'
                }
            >
                {hashtagList.map(hashtag => (
                    <li
                        className={
                            'flex flex-shrink-0 items-center justify-between gap-x-2 rounded-lg bg-slate-100 px-3 py-1.5 text-[0.75rem] font-bold text-slate-800'
                        }
                    >
                        {hashtag}
                        <button
                            type={'button'}
                            onClick={() => {
                                handleDeleteHashtagButtonClick(hashtag);
                            }}
                        >
                            <HiXMark className={'size-4 text-slate-800'} />
                        </button>
                    </li>
                ))}
                <li className={'flex w-36 items-center'}>
                    <input
                        className={'text-[0.8rem] placeholder:text-slate-400 focus:outline-none'}
                        type={'text'}
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder={'태그로 검색해보세요.'}
                    />
                </li>
            </ul>
            <div className={'tooltip tooltip-bottom flex items-center'} data-tip={'태그 초기화'}>
                <button
                    type={'button'}
                    onClick={() => {
                        searchParams.delete('tag');
                        setSearchParams(searchParams);
                    }}
                >
                    <HiOutlineArrowPath className={'size-6 text-plump-purple-600'} />
                </button>
            </div>
        </div>
    );
}

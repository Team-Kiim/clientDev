import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';
import { HiOutlineArrowPath, HiXMark } from 'react-icons/hi2';
import { PiHashStraight } from 'react-icons/pi';

interface HashTag {
    id: string | number;
    content: string;
}

interface Props {
    hashTagInfoList: HashTag[];
    addHashTag(hashTag: string): void;
    deleteHashTag(hashTagToDelete: HashTag): void;
    deleteAllHashTags(): void;
}

export default function PostHashTagField({ hashTagInfoList, addHashTag, deleteHashTag, deleteAllHashTags }: Props) {
    const [inputValue, setInputValue] = useState('');

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
            event.preventDefault();
            if (inputValue !== '') {
                addHashTag(inputValue);
                setInputValue('');
            }
        }
    };

    const handleDeleteHashTagButtonClick = (hashTagInfoToDelete: HashTag) => {
        deleteHashTag(hashTagInfoToDelete);
    };

    return (
        <div className={'flex flex-col gap-y-2'}>
            <span className={'mx-1 text-[0.9rem] font-bold'}>해시태그</span>
            <div className={'flex w-full flex-shrink-0 items-center gap-x-2 rounded-lg border border-slate-300 px-3'}>
                <PiHashStraight className={'size-6 text-plump-purple-600'} />
                <ul
                    className={
                        'flex h-11 min-w-0 flex-1 flex-wrap justify-start gap-2 overflow-y-auto overscroll-y-contain py-2 scrollbar-hide'
                    }
                >
                    {hashTagInfoList.map(hashTagInfo => (
                        <li
                            key={hashTagInfo.id}
                            className={
                                'flex flex-shrink-0 items-center justify-between gap-x-2 rounded-lg bg-slate-100 px-3 py-1.5 text-[0.75rem] font-bold text-slate-800'
                            }
                        >
                            {hashTagInfo.content}
                            <button
                                type={'button'}
                                onClick={() => {
                                    handleDeleteHashTagButtonClick(hashTagInfo);
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
                            placeholder={'해시태그 입력'}
                        />
                    </li>
                </ul>
                <div className={'tooltip tooltip-bottom flex items-center'} data-tip={'해시태그 초기화'}>
                    <button type={'button'} onClick={deleteAllHashTags}>
                        <HiOutlineArrowPath className={'size-6 text-plump-purple-600'} />
                    </button>
                </div>
            </div>
            <p className={'mx-1 text-[0.75rem] leading-relaxed text-slate-500 '}>
                • 해시태그를 입력하면 내 게시글이 더 쉽게 검색될 수 있어요.
            </p>
        </div>
    );
}

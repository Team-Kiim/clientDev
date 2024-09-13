import { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { HiMagnifyingGlass } from 'react-icons/hi2';

export default function SearchPostInput() {
    const [postType, setPostType] = useState('qnas');

    const inputRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const { pathname } = useLocation();

    const [searchParams] = useSearchParams();

    useEffect(() => {
        const splitPathname = pathname.split('/');
        if (splitPathname[1] === '' || splitPathname[1] === 'qnas' || splitPathname[1] === 'community') {
            inputRef.current.value = searchParams.get('search') ?? '';
        } else {
            inputRef.current.value = '';
        }
    }, [searchParams, pathname]);

    const updateUrl = () => {
        const searchKeyword = inputRef.current.value;
        if (searchKeyword === '') {
            searchParams.delete('search');
        } else {
            searchParams.set('search', searchKeyword);
        }

        searchParams.delete('category');

        searchParams.delete('sort');

        navigate(`/${postType}?${searchParams.toString()}`);
    };

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
        if (event.nativeEvent.isComposing) {
            return;
        }

        if (event.code === 'Enter') {
            updateUrl();
        }
    };

    const handleChangePostTypeButtonClick = () => {
        setPostType(state => (state === 'qnas' ? 'community' : 'qnas'));
    };

    const handleSearchPostButtonClick = () => {
        updateUrl();
    };

    return (
        <>
            <svg width={'0'} height={'0'}>
                <linearGradient id={'icon-gradient'} x1={'0%'} y1={'0%'} x2={'100%'} y2={'100%'}>
                    <stop stopColor='#6a3093' offset='0%' />
                    <stop stopColor='#a044ff' offset='100%' />
                </linearGradient>
            </svg>
            <div
                className={
                    'w-[36rem] gap-x-2.5 rounded-3xl bg-gradient-to-br from-[#6a3093] to-[#a044ff] p-0.5 transition-all focus-within:shadow-lg'
                }
            >
                <div className={'flex items-center gap-x-2.5 rounded-[calc(1.5rem-1px)] bg-white px-5 py-2'}>
                    <button className={'w-14'} type={'button'} onMouseDown={handleChangePostTypeButtonClick}>
                        <span
                            className={
                                'inline-block bg-gradient-to-br from-[#6a3093] to-[#a044ff] bg-clip-text text-sm font-bold text-transparent'
                            }
                        >
                            {postType === 'community' ? '커뮤니티' : 'Q&A'}
                        </span>
                    </button>
                    <input
                        className={'flex-1 text-sm focus:outline-none'}
                        onKeyDown={handleKeyDown}
                        placeholder={`${postType === 'community' ? '커뮤니티' : 'Q&A'} 게시글 검색`}
                        autoComplete={'off'}
                        ref={inputRef}
                    />
                    <button type={'button'} onClick={handleSearchPostButtonClick}>
                        <HiMagnifyingGlass
                            className={'size-6'}
                            style={{
                                fill: 'url(#icon-gradient)',
                            }}
                        />
                    </button>
                </div>
            </div>
        </>
    );
}

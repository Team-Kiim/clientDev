import { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { TbUsers, TbUserQuestion } from 'react-icons/tb';

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
            <div>
                <div
                    className={
                        'flex w-[40rem] items-center gap-x-2.5 rounded-3xl bg-slate-100 px-4 py-2.5 transition-all'
                    }
                >
                    <div
                        className={'tooltip tooltip-bottom flex items-center justify-center before:text-[0.8rem]'}
                        data-tip={`${postType === 'qnas' ? 'QnA 게시글 검색' : '커뮤니티 게시글 검색'}`}
                    >
                        <button
                            type={'button'}
                            onClick={() => {
                                handleChangePostTypeButtonClick();
                            }}
                        >
                            {postType === 'qnas' ? (
                                <TbUserQuestion className={'size-6 text-plump-purple-600'} />
                            ) : (
                                <TbUsers className={'size-6 text-plump-purple-600'} />
                            )}
                        </button>
                    </div>
                    <input
                        className={'flex-1 bg-transparent text-sm focus:outline-none'}
                        onKeyDown={handleKeyDown}
                        placeholder={`제목으로 ${postType === 'qnas' ? 'QnA' : '커뮤니티'} 게시글 검색`}
                        autoComplete={'off'}
                        ref={inputRef}
                    />
                    <button type={'button'} onClick={handleSearchPostButtonClick}>
                        <HiMagnifyingGlass className={'size-6 text-plump-purple-600'} />
                    </button>
                </div>
            </div>
        </>
    );
}

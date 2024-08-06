import { HiMagnifyingGlass, HiOutlinePlus, HiXMark } from 'react-icons/hi2';

interface Props {
    currentViewName: string;
    updateCurrentViewName(screenName: string): void;
}

export default function MyChatModalTop({ currentViewName, updateCurrentViewName }: Props) {
    return (
        <div className={'flex items-center justify-between px-6'}>
            <h1 className={'text-xl font-extrabold'}>
                {
                    {
                        home: '나의 채팅',
                        chatSearch: '채팅방 검색',
                        chatPlus: '채팅 추가',
                    }[currentViewName]
                }
            </h1>
            <div className={'flex justify-end gap-x-2'}>
                {currentViewName === 'home' ? (
                    <>
                        <button
                            className={'rounded-full p-1 hover:bg-slate-100'}
                            onClick={() => {
                                updateCurrentViewName('chatSearch');
                            }}
                            type={'button'}
                        >
                            <HiMagnifyingGlass className={'size-6'} />
                        </button>
                        <button
                            className={'rounded-full p-1 hover:bg-slate-100'}
                            onClick={() => {
                                updateCurrentViewName('chatPlus');
                            }}
                            type={'button'}
                        >
                            <HiOutlinePlus className={'size-6'} />
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className={'rounded-full p-1 hover:bg-slate-100'}
                            onClick={() => {
                                updateCurrentViewName('home');
                            }}
                            type={'button'}
                        >
                            <HiXMark className={'size-6'} />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

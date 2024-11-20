import { HiOutlinePlus, HiXMark } from 'react-icons/hi2';

interface Props {
    currentViewName: string;
    updateCurrentViewName(screenName: string): void;
}

export default function MyChatModalTop({ currentViewName, updateCurrentViewName }: Props) {
    return (
        <div className={'flex items-center justify-between border-b border-slate-200 px-6 py-3'}>
            <h1 className={'text-lg font-extrabold'}>
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
                        <div className={'tooltip tooltip-bottom before:text-[0.8rem]'} data-tip={'채팅방 추가'}>
                            <button
                                className={'p-1'}
                                onClick={() => {
                                    updateCurrentViewName('chatPlus');
                                }}
                                type={'button'}
                            >
                                <HiOutlinePlus className={'size-6'} />
                            </button>
                        </div>
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

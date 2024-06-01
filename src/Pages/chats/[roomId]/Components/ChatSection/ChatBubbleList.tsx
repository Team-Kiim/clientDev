export default function ChatBubbleList() {
    return (
        <div className={'flex shrink-0 flex-grow basis-0 flex-col overflow-y-auto bg-slate-50 p-2 scrollbar-hide'}>
            <div className='chat chat-start'>
                <div className='avatar chat-image'>
                    <div className='w-10 rounded-full'>
                        <img
                            alt='Tailwind CSS chat bubble component'
                            src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                        />
                    </div>
                </div>
                <div className='chat-header mb-1 flex items-center'>
                    <span className={'mx-2 font-bold'}>콩이</span>
                </div>
                <div className='chat-bubble flex max-w-[220px] flex-col justify-center bg-slate-200 text-[0.87rem] text-black'>
                    안녕하세요 테스트입니다 긴 문자열도 테스트입니다
                </div>
                <div className='chat-footer mx-2'>
                    <time className='text-[0.7rem] opacity-80'>2024.12.2 오후 12:45</time>
                </div>
            </div>
            <div className='chat chat-end'>
                <div className='avatar chat-image'>
                    <div className='w-10 rounded-full'>
                        <img
                            alt='Tailwind CSS chat bubble component'
                            src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                        />
                    </div>
                </div>
                <div className='chat-header mb-1 flex items-center'>
                    <span className={'mx-2 font-bold'}>두부</span>
                </div>
                <div className='chat-bubble flex max-w-[220px] flex-col justify-center text-[0.87rem] '>ㅇ</div>
                <div className='chat-footer mx-2'>
                    <time className='text-xs opacity-80'>오후 8:30</time>
                </div>
            </div>
            <div className='chat chat-end'>
                <div className='avatar chat-image'>
                    <div className='w-10 rounded-full'>
                        <img
                            alt='Tailwind CSS chat bubble component'
                            src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                        />
                    </div>
                </div>
                <div className='chat-header mb-1 flex items-center'>
                    <span className={'mx-2 font-bold'}>두부</span>
                </div>
                <div className='chat-bubble flex max-w-[220px] flex-col justify-center text-[0.87rem] '>안녕하세요</div>
                <div className='chat-footer mx-2'>
                    <time className='text-xs opacity-80'>오후 8:30</time>
                </div>
            </div>
        </div>
    );
}

import { PiChatsTeardrop } from 'react-icons/pi';

export default function MyChatButton() {
    return (
        <div className={'tooltip tooltip-bottom fixed bottom-16 right-36'} data-tip={'나의 채팅'}>
            <button className={'rounded-full bg-violet-600 p-3.5 shadow-lg hover:bg-violet-700 '}>
                <PiChatsTeardrop className={'size-9 text-white'} />
            </button>
        </div>
    );
}

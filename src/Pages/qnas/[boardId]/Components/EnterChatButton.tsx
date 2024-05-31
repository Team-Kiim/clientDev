import { Link, useParams } from 'react-router-dom';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export default function EnterChatButton() {
    const postId = useParams().postId;

    return (
        <Link className={'w-10/12'} to={`/chats/${postId}`}>
            <div
                className={
                    'mx-auto flex w-full items-center justify-center gap-x-3 rounded-2xl bg-gradient-to-r from-purple-400 to-violet-600 p-3 text-white shadow-lg transition-all hover:scale-105'
                }
            >
                <ChatBubbleLeftRightIcon className={'size-7'} />
                <span className={'text-[0.9rem] font-bold'}>채팅 참여하기</span>
            </div>
        </Link>
    );
}

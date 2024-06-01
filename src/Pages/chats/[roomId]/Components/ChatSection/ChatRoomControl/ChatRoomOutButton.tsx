import { useNavigate } from 'react-router-dom';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';

export default function ChatRoomOutButton() {
    const navigate = useNavigate();

    return (
        <button className={'text-violet-700 transition-all active:scale-95'} type={'button'}>
            <ArrowLeftStartOnRectangleIcon className={'size-6 stroke-2'} />
        </button>
    );
}

import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function ToChatListButton() {
    const navigate = useNavigate();

    return (
        <button className={'text-violet-700 transition-all active:scale-90'} type={'button'}>
            <ArrowLeftIcon className={'size-6 stroke-2'} />
        </button>
    );
}

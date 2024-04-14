import { useNavigate } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function PostAddButton() {
    const navigate = useNavigate();

    const handlePostAddButtonClick = () => {
        navigate('/qnas/write');
    };

    return (
        <div className={'tooltip tooltip-top fixed bottom-10 right-40'} data-tip={'Q&A 작성'}>
            <button
                className={'rounded-full bg-violet-600 p-2'}
                onClick={() => {
                    handlePostAddButtonClick();
                }}
            >
                <PlusIcon className={'size-11 text-white'} />
            </button>
        </div>
    );
}

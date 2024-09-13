import { useNavigate } from 'react-router-dom';
import { PiPencilSimpleLine } from 'react-icons/pi';

interface Props {
    postType: string;
}

export default function WritePostButton({ postType }: Props) {
    const navigate = useNavigate();

    const handlePostWriteButtonClick = () => {
        navigate(`/${postType}/write`);
    };

    return (
        <button
            className={
                'flex items-center gap-x-2 rounded-3xl bg-gradient-to-br from-[#6a3093] to-[#a044ff] px-4 py-2.5 text-white transition-all hover:scale-105 '
            }
            onClick={handlePostWriteButtonClick}
            type={'button'}
        >
            <PiPencilSimpleLine className={'size-5'} />
            <span className={'text-[0.85rem] font-bold'}>글쓰기</span>
        </button>
    );
}

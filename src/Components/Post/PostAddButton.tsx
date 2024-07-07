import { useLocation, useNavigate } from 'react-router-dom';
import { GoPencil } from 'react-icons/go';

export default function PostAddButton() {
    const navigate = useNavigate();

    const { pathname } = useLocation();

    const handlePostAddButtonClick = () => {
        if (pathname === '/' || pathname === '/qnas') {
            navigate('/qnas/write');
        } else {
            navigate('/community/write');
        }
    };

    return (
        <button
            className={
                'flex items-center gap-x-2 rounded-xl border border-violet-600 bg-violet-600 px-3.5 py-2.5 text-white transition-all hover:border-violet-700 hover:bg-violet-700'
            }
            onClick={() => {
                handlePostAddButtonClick();
            }}
            type={'button'}
        >
            <GoPencil className={'size-5'} />
            <span className={'text-[0.85rem] font-bold'}>글작성</span>
        </button>
    );
}

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { GoChevronLeft, GoSignOut } from 'react-icons/go';

interface Props {
    skillCategoryLabel: string;
    skillCategoryValue: string;
}

export default function ChatRoomTop({ skillCategoryLabel, skillCategoryValue }: Props) {
    const navigate = useNavigate();

    const skillCategorySvgPath = `/src/assets/svgs/skillCategory/${skillCategoryValue.toLowerCase()}.svg`;

    const handleLeaveChatButtonClick = () => {
        Swal.fire({
            icon: 'question',
            text: '채팅방을 나가시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            customClass: {
                cancelButton: 'text-black font-bold bg-slate-100',
                confirmButton: 'text-white font-bold bg-violet-600',
            },
        }).then(result => {
            if (result.isConfirmed) {
                navigate('/chats');
            }
        });
    };

    return (
        <div
            className={
                'absolute top-0 z-10 flex w-full items-center justify-between rounded-t-xl border-b border-slate-200 bg-white/75 p-3 backdrop-blur-md'
            }
        >
            <button
                className={'rounded-full p-1 transition-all hover:bg-slate-100'}
                onClick={() => {
                    navigate('/chats');
                }}
                type={'button'}
            >
                <GoChevronLeft className={'size-6 text-slate-500'} />
            </button>
            <div className={'flex flex-1 items-center gap-x-3 px-2'}>
                <img src={skillCategorySvgPath} alt={skillCategoryLabel} className={'w-8'} />
                <div className={'flex flex-col'}>
                    <h2 className={'text-[0.9rem] font-extrabold'}>{skillCategoryLabel}</h2>
                    <span className={'text-[0.75rem] font-bold text-slate-500'}>230명 참여 중</span>
                </div>
            </div>
            <button
                className={'rounded-full p-1 transition-all hover:bg-slate-100'}
                onClick={handleLeaveChatButtonClick}
                type={'button'}
            >
                <GoSignOut className={'size-6 text-slate-500'} />
            </button>
        </div>
    );
}

import { GoChevronLeft, GoSignOut } from 'react-icons/go';
import Swal from 'sweetalert2';

interface Props {
    otherUserNickname: string;
    updateCurrentViewName(viewName: string): void;
}

export default function ChatRoomTop({ otherUserNickname, updateCurrentViewName }: Props) {
    const handleLeaveChatButtonClick = () => {
        Swal.fire({
            target: '.myChatModal',
            text: '채팅방을 나가시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            confirmButtonColor: '#7c3aed',
            cancelButtonColor: '#f1f5f9',
            customClass: {
                popup: 'rounded-3xl w-[240px] text-[0.8rem] py-3',
                container: 'absolute rounded-[2.5rem]',
                cancelButton: 'text-black font-bold',
                confirmButton: 'font-bold',
            },
        }).then(result => {
            if (result.isConfirmed) {
                updateCurrentViewName('home');
            }
        });
    };

    return (
        <div className={'flex items-center border-b border-slate-200 px-4 pb-2'}>
            <button
                className={'rounded-full p-1 hover:bg-slate-100'}
                onClick={() => {
                    updateCurrentViewName('home');
                }}
                type={'button'}
            >
                <GoChevronLeft className={'size-6 text-slate-500'} />
            </button>
            <div className={'flex flex-1 flex-col text-center'}>
                <span className={'line-clamp-1 font-extrabold'}>{otherUserNickname}</span>
                <span
                    className={
                        'line-clamp-1 text-[0.7rem] font-bold text-slate-500 underline decoration-slate-500 decoration-1 underline-offset-2'
                    }
                >
                    kkangasdf12@gmail.com
                </span>
            </div>
            <button
                className={'rounded-full p-1 hover:bg-slate-100'}
                onClick={handleLeaveChatButtonClick}
                type={'button'}
            >
                <GoSignOut className={'size-6 text-slate-500'} />
            </button>
        </div>
    );
}

import { HiArrowRightStartOnRectangle, HiChevronLeft } from 'react-icons/hi2';
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
        <div className={'flex items-center px-6'}>
            <button
                className={'rounded-full p-1 hover:bg-slate-100'}
                onClick={() => {
                    updateCurrentViewName('home');
                }}
                type={'button'}
            >
                <HiChevronLeft className={'size-6'} />
            </button>
            <div className={'flex-1'}>
                <span className={'line-clamp-1 px-3 font-extrabold'}>{otherUserNickname}</span>
            </div>
            <button
                className={'rounded-full p-1 hover:bg-slate-100'}
                onClick={handleLeaveChatButtonClick}
                type={'button'}
            >
                <HiArrowRightStartOnRectangle className={'size-6'} />
            </button>
        </div>
    );
}

import Swal from 'sweetalert2';
import { IoTrashBinOutline } from 'react-icons/io5';

interface Props {
    isButtonDisabled: boolean;
}

export default function DeleteAllNotificationsButton({ isButtonDisabled }: Props) {
    const handleDeleteAllNotificationButtonClick = () => {
        Swal.fire({
            target: '.notificationModal',
            text: '알림을 모두 삭제할까요?',
            showCancelButton: true,
            confirmButtonText: '삭제',
            cancelButtonText: '취소',
            customClass: {
                popup: 'rounded-3xl w-[240px] text-[0.8rem] py-3',
                container: 'absolute rounded-xl',
                cancelButton: 'text-black font-bold bg-slate-100',
                confirmButton: 'font-bold text-white bg-violet-600',
            },
        }).then(result => {
            if (result.isConfirmed) {
            }
        });
    };

    return (
        <div className={'tooltip tooltip-bottom'} data-tip={'모두 삭제'}>
            <button
                className={'rounded-full p-1 enabled:hover:bg-slate-100 disabled:opacity-50'}
                onClick={handleDeleteAllNotificationButtonClick}
                type={'button'}
                disabled={isButtonDisabled}
            >
                <IoTrashBinOutline className={'size-6'} />
            </button>
        </div>
    );
}

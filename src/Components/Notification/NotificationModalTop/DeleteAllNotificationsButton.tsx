import Swal from 'sweetalert2';
import { HiOutlineTrash } from 'react-icons/hi2';

export default function DeleteAllNotificationsButton() {
    const handleDeleteAllNotificationsButtonClick = () => {
        Swal.fire({
            target: '.notificationModal',
            text: '알림을 모두 삭제하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            confirmButtonColor: '#7c3aed',
            cancelButtonColor: '#f1f5f9',
            customClass: {
                popup: 'rounded-3xl w-[240px] text-[0.8rem] py-3',
                container: 'absolute rounded-lg',
                cancelButton: 'text-black font-bold',
                confirmButton: 'font-bold',
            },
        }).then(result => {
            if (result.isConfirmed) {
                // 삭제
            }
        });
    };

    return (
        <div className={'tooltip tooltip-bottom'} data-tip={'전부 삭제'}>
            <button
                className={'rounded-full p-1 hover:bg-slate-100'}
                onClick={handleDeleteAllNotificationsButtonClick}
                type={'button'}
            >
                <HiOutlineTrash className={'size-6'} />
            </button>
        </div>
    );
}

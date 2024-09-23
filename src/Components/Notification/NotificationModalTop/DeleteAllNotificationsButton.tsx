import { IoTrashBinOutline } from 'react-icons/io5';

interface Props {
    isButtonDisabled: boolean;
    openDeleteWarningModal(): void;
}

export default function DeleteAllNotificationsButton({ isButtonDisabled, openDeleteWarningModal }: Props) {
    const handleDeleteAllNotificationButtonClick = () => {
        openDeleteWarningModal();
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

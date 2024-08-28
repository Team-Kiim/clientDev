interface Props {
    isButtonDisabled: boolean;
}

export default function ReadAllNotificationsButton({ isButtonDisabled }: Props) {
    const handleReadAllNotificationsButtonClick = () => {
        console.log('read all');
    };

    return (
        <button
            className={'rounded-lg px-2 py-1 text-[0.75rem] font-bold enabled:hover:bg-slate-100 disabled:opacity-50'}
            onClick={handleReadAllNotificationsButtonClick}
            type={'button'}
            disabled={isButtonDisabled}
        >
            모두 읽음 표시
        </button>
    );
}

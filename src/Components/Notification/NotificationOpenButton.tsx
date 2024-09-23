import { HiOutlineBell } from 'react-icons/hi2';

interface Props {
    isUserChecked: boolean;
    onNotificationButtonClick(): void;
}

export default function NotificationOpenButton({ isUserChecked, onNotificationButtonClick }: Props) {
    return (
        <div className={'relative'}>
            {!isUserChecked && <div className={'absolute -top-0 right-0 size-2.5 rounded-full bg-plump-purple-600'} />}
            <button
                className={'rounded-full p-1 transition-all hover:bg-slate-100'}
                onClick={onNotificationButtonClick}
            >
                <HiOutlineBell className={'size-7'} />
            </button>
        </div>
    );
}

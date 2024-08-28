interface Props {
    refetchNotificationList: (...args: any[]) => any;
}

export default function NotificationErrorFallback({ refetchNotificationList }: Props) {
    return (
        <div className={'flex min-h-0 flex-1 flex-col items-center justify-center gap-y-3 rounded-b-lg'}>
            <p className={'text-center text-[0.75rem] font-bold text-slate-400'}>
                알림 목록을 불러올 수 없습니다. 잠시 후 다시 시도해주세요.
            </p>
            <button
                className={
                    'rounded-3xl bg-neutral-800 px-3.5 py-2 text-[0.75rem] font-bold text-white transition-all hover:bg-neutral-800/80'
                }
                type={'button'}
                onClick={refetchNotificationList}
            >
                다시 시도
            </button>
        </div>
    );
}

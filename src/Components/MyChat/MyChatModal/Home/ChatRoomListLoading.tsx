import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function ChatRoomListLoading() {
    return (
        <SkeletonTheme enableAnimation={false}>
            <ul className={'flex min-h-0 flex-1 flex-col rounded-b-3xl'}>
                {Array.from(new Array(6).keys()).map(e => (
                    <li
                        className={'flex items-center gap-x-3.5 border-b border-slate-200 px-4 py-3.5 last:border-none'}
                        key={e}
                    >
                        <Skeleton className={'size-10 rounded-full'} circle />
                        <div className={'flex min-w-0 flex-1 flex-col gap-y-1.5'}>
                            <div className={'flex w-full items-center justify-between'}>
                                <Skeleton className={'h-4 w-24'} />
                                <Skeleton className={'h-3 w-8'} />
                            </div>
                            <div className={'flex justify-between'}>
                                <Skeleton className={'h-[0.8rem] w-36'} />
                                <Skeleton className={'size-[1.35rem] rounded-full'} circle />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </SkeletonTheme>
    );
}

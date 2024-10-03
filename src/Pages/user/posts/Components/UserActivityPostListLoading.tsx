import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function UserActivityPostListLoading() {
    return (
        <SkeletonTheme enableAnimation={false}>
            <ul className={'grid w-full grid-cols-3 gap-4 pt-3'}>
                {Array.from(Array(3).keys()).map(e => (
                    <li key={e} className={'flex h-72 flex-col gap-y-2 rounded-3xl border border-slate-200'}>
                        <Skeleton
                            className={'h-[8.5rem] w-full rounded-b-none rounded-t-[calc(1.5rem-1px)]'}
                            containerClassName={'h-[8.5rem] flex w-full rounded-b-none rounded-t-[calc(1.5rem-1px)]'}
                        />
                        <div className={'flex w-full items-center gap-x-2 px-2'}>
                            <Skeleton className={'size-6'} circle />
                            <div className={'flex min-w-0 flex-1 flex-col gap-y-1'}>
                                <Skeleton className={'h-3.5 w-[5.2rem]'} containerClassName={'h-3.5 w-[5.2rem]'} />
                                <Skeleton className={'h-3 w-16'} containerClassName={'h-3 w-16'} />
                            </div>
                        </div>
                        <div className={'px-2'}>
                            <Skeleton className={'h-5 w-full'} />
                        </div>
                        <div className={'flex flex-1 flex-col gap-y-2 px-2'}>
                            <Skeleton className={'h-2.5'} containerClassName={'h-2.5 flex'} />
                            <Skeleton className={'h-2.5'} containerClassName={'h-2.5 flex'} />
                        </div>
                        <div className={'flex items-center justify-end gap-x-2 px-4 pb-2'}>
                            <Skeleton className={'h-[1.05rem] w-9'} />
                            <Skeleton className={'h-[1.05rem] w-9'} />
                        </div>
                    </li>
                ))}
            </ul>
        </SkeletonTheme>
    );
}

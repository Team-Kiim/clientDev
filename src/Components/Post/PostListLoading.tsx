import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function PostListLoading() {
    return (
        <SkeletonTheme enableAnimation={false}>
            <ul className={'grid grid-cols-4 gap-x-4 gap-y-10 px-6 pb-10 pt-3'}>
                {Array.from(Array(8).keys()).map(e => (
                    <li key={e} className={'flex h-[22rem] flex-col gap-y-3 rounded-3xl shadow-lg transition-all'}>
                        <Skeleton className={'h-40 w-full rounded-b-none rounded-t-3xl'} />
                        <div className={'flex items-center gap-x-2 px-2'}>
                            <Skeleton className={'size-8'} circle />
                            <div className={'flex flex-col gap-y-1'}>
                                <Skeleton className={'h-4 w-[5.2rem]'} containerClassName={'h-4 w-[5.2rem]'} />
                                <Skeleton className={'h-3.5 w-16'} containerClassName={'h-3.5 w-16'} />
                            </div>
                        </div>
                        <div className={'px-2'}>
                            <Skeleton className={'h-6 w-full'} />
                        </div>
                        <div className={'flex flex-1 flex-col gap-y-2 px-2'}>
                            <Skeleton className={'h-2.5'} containerClassName={'h-2.5 flex'} />
                            <Skeleton className={'h-2.5'} containerClassName={'h-2.5 flex'} />
                            <Skeleton className={'h-2.5'} containerClassName={'h-2.5 flex'} />
                        </div>
                        <div className={'flex items-center justify-end gap-x-2 px-4 pb-2'}>
                            <Skeleton className={'h-[1.05rem] w-[3.25rem]'} />
                            <Skeleton className={'h-[1.05rem] w-[3.25rem]'} />
                        </div>
                    </li>
                ))}
            </ul>
        </SkeletonTheme>
    );
}

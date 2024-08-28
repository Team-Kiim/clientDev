import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function NotificationLoading() {
    return (
        <SkeletonTheme enableAnimation={false}>
            <ul className={'flex min-h-0 flex-1 flex-col rounded-b-lg'}>
                {Array.from(Array(4).keys()).map(e => (
                    <li
                        key={e}
                        className={
                            'flex w-full gap-x-3 border-b border-slate-200 bg-white px-3.5 py-3 last:border-none'
                        }
                    >
                        <div className={'size-8'}>
                            <Skeleton className={'size-8'} circle />
                        </div>
                        <div className={'flex min-w-0 flex-1 flex-col gap-y-2'}>
                            <div className={'flex w-full flex-col gap-y-1'}>
                                <Skeleton className={'h-4 w-full'} />
                                <Skeleton className={'h-3.5 w-4/5'} />
                            </div>
                            <div className={'h-4 w-8'}>
                                <Skeleton className={'h-4 w-8'} />
                            </div>
                        </div>
                        <div className={'flex h-full flex-col items-center justify-between'}>
                            <div className={'size-2'}>
                                <Skeleton className={'size-2'} circle />
                            </div>
                            <div className={'h-4 w-6'}>
                                <Skeleton className={'h-4 w-6'} />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </SkeletonTheme>
    );
}

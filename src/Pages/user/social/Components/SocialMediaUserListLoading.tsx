import { useSearchParams } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getCurrentSocialType } from '@/Pages/user/social/Utils/getCurrentSocialType.ts';

export default function SocialMediaUserListLoading() {
    const [searchParams] = useSearchParams();

    const currentSocialType = getCurrentSocialType(searchParams);

    return (
        <SkeletonTheme enableAnimation={false}>
            <div className={'flex flex-col gap-y-3'}>
                <div className={'flex items-center'}>
                    <Skeleton className={'h-5 w-[4.5rem]'} />
                </div>
                <div>
                    <ul className={'flex flex-col'}>
                        {Array.from(Array(4).keys()).map(e => (
                            <li
                                key={e}
                                className={'flex gap-x-4 border-b border-slate-200 px-3.5 py-5 last:border-none'}
                            >
                                <Skeleton className={'size-8'} circle />
                                <div className={'flex min-w-0 flex-1 flex-col gap-y-1'}>
                                    <Skeleton className={'h-[1.4rem] w-24'} />
                                    <Skeleton className={'h-4 w-40'} />
                                </div>
                                {currentSocialType === 'following' && (
                                    <div className={'flex flex-col justify-center'}>
                                        <Skeleton className={'h-8 w-[4.3rem] rounded-3xl'} />
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </SkeletonTheme>
    );
}

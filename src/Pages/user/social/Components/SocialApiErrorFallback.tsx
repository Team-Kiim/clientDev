import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { FallbackProps } from 'react-error-boundary';
import { getCurrentSocialType } from '@/Pages/user/social/Utils/getCurrentSocialType.ts';

export default function SocialApiErrorFallback({ resetErrorBoundary }: FallbackProps) {
    const [searchParams] = useSearchParams();

    const queryClient = useQueryClient();

    const currentSocialType = getCurrentSocialType(searchParams);

    useEffect(() => {
        return () => {
            queryClient
                .resetQueries({
                    queryKey: [
                        'user',
                        'social',
                        {
                            relationshipType: currentSocialType === 'follower' ? 'followers' : 'followings',
                        },
                    ],
                })
                .catch();
        };
    }, []);

    return (
        <div className={'my-10 flex w-full flex-col items-center gap-y-4'}>
            <p className={'text-sm text-slate-400'}>
                {currentSocialType === 'following' ? '팔로잉' : '팔로워'} 목록을 불러올 수 없어요. 잠시 후 다시
                시도해주세요.
            </p>
            <button
                className={
                    'rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 px-3.5 py-2 text-[0.8rem] font-bold text-white transition-all hover:scale-105'
                }
                type={'button'}
                onClick={resetErrorBoundary}
            >
                다시 시도
            </button>
        </div>
    );
}

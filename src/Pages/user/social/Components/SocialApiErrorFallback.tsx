import { FallbackProps } from 'react-error-boundary';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
    relationshipType: string;
} & FallbackProps;

export default function SocialApiErrorFallback({ relationshipType, resetErrorBoundary }: Props) {
    const queryClient = useQueryClient();
    useEffect(() => {
        return () => {
            queryClient.removeQueries({ queryKey: ['social', relationshipType] });
        };
    }, []);

    return (
        <div
            className={'absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-y-5'}
        >
            <p className={'shrink-0 text-center text-[0.85rem] font-bold text-slate-500'}>
                {relationshipType === 'following' ? '팔로잉' : '팔로워'} 목록을 가져올 수 없습니다.
                <br />
                잠시 후 다시 시도해주세요.
            </p>
            <button
                className={
                    'rounded-xl border border-violet-300 bg-violet-50 px-3.5 py-1.5 text-[0.85rem] font-bold text-violet-700'
                }
                type={'button'}
                onClick={() => {
                    resetErrorBoundary();
                }}
            >
                다시 시도
            </button>
        </div>
    );
}

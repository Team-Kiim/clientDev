import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { FallbackProps } from 'react-error-boundary';

export default function UserActivityPostErrorFallback({ resetErrorBoundary }: FallbackProps) {
    const queryClient = useQueryClient();

    useEffect(() => {
        return () => {
            queryClient
                .resetQueries({
                    queryKey: ['user', 'post'],
                })
                .catch();
        };
    }, []);

    return (
        <div className={'my-10 flex w-full flex-col items-center gap-y-4'}>
            <p className={'text-sm text-slate-400'}>게시글 목록을 불러올 수 없어요. 잠시 후 다시 시도해주세요.</p>
            <button
                className={
                    'rounded-3xl bg-plump-purple-600 px-3.5 py-2 text-[0.8rem] font-bold text-white transition-all hover:bg-plump-purple-700'
                }
                type={'button'}
                onClick={resetErrorBoundary}
            >
                다시 시도
            </button>
        </div>
    );
}

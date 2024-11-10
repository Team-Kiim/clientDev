import { FallbackProps } from 'react-error-boundary';

export default function ({ resetErrorBoundary }: FallbackProps) {
    return (
        <div className={'flex min-h-0 flex-1 flex-col items-center justify-center gap-y-3 rounded-b-3xl'}>
            <p className={'text-center text-[0.75rem] font-bold text-slate-400'}>
                채팅방 목록을 불러올 수 없습니다. 잠시 후 다시 시도해주세요.
            </p>
            <button
                className={
                    'rounded-3xl bg-plump-purple-600 px-3.5 py-2 text-[0.75rem] font-bold text-white transition-all hover:bg-plump-purple-700'
                }
                type={'button'}
                onClick={resetErrorBoundary}
            >
                다시 시도
            </button>
        </div>
    );
}

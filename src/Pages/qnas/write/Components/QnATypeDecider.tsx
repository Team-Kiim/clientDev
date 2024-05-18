import { useEffect } from 'react';
import useQnATypeStore from '@/Stores/useQnATypeStore.ts';

export default function QnATypeDecider() {
    const { qnaType, updateQnAType } = useQnATypeStore(state => state);

    useEffect(() => {
        return () => {
            if (qnaType === 'dev') {
                return;
            }
            updateQnAType('dev');
        };
    }, [qnaType]);

    const handleQnATypeChangeButtonClick = (qnaTypeToChange: string) => {
        if (qnaType === qnaTypeToChange) {
            return;
        }
        if (window.confirm('지금까지 작성한 내용은 저장되지 않습니다. Q&A 유형을 변경하시겠습니까?')) {
            updateQnAType(qnaTypeToChange);
        }
    };

    return (
        <div className={'flex items-center gap-x-5 border-b border-gray-300 pb-2'}>
            <button
                className={'px-2 py-1'}
                type={'button'}
                onClick={() => {
                    handleQnATypeChangeButtonClick('dev');
                }}
            >
                <span className={`${qnaType === 'dev' ? 'text-violet-700' : 'text-gray-500'} font-bold`}>개발</span>
            </button>
            <button
                className={'px-2 py-1'}
                type={'button'}
                onClick={() => {
                    handleQnATypeChangeButtonClick('nonDev');
                }}
            >
                <span className={`${qnaType === 'nonDev' ? 'text-violet-700' : 'text-gray-500'} font-bold`}>
                    비개발
                </span>
            </button>
        </div>
    );
}

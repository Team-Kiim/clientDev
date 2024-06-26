import useQnATypeStore from '@/Stores/useQnATypeStore.ts';

export default function QnATypeDecider() {
    const { qnaType, updateQnAType } = useQnATypeStore(state => state);

    const handleQnATypeChangeButtonClick = (qnaTypeToChange: string) => {
        updateQnAType(qnaTypeToChange);
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
                className={'rounded-lg px-2 py-1 transition-all hover:bg-violet-50'}
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

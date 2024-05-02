import { useSearchParams } from 'react-router-dom';
import getQnAType from '@/Pages/qnas/write/Utils/getQnAType.ts';

export default function QnATypeDecider() {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentQnAType = getQnAType(searchParams);

    const handleQnATypeChangeButtonClick = (qnaTypeToChange: string) => {
        if (qnaTypeToChange === currentQnAType) {
            return;
        }
        if (window.confirm('지금까지 작성한 내용은 저장되지 않습니다. Q&A 유형을 변경하시겠습니까?')) {
            searchParams.set('qna_type', qnaTypeToChange);
            setSearchParams(searchParams);
        }
    };

    return (
        <div className={'flex items-center gap-x-5 border-b border-gray-300 pb-2'}>
            <button
                className={'rounded-lg px-2 py-1 transition-all hover:bg-violet-50'}
                type={'button'}
                onClick={() => {
                    handleQnATypeChangeButtonClick('dev');
                }}
            >
                <span className={`${currentQnAType === 'dev' ? 'text-violet-600' : 'text-gray-600'} font-medium`}>
                    개발
                </span>
            </button>
            <button
                className={'rounded-lg px-2 py-1 transition-all hover:bg-violet-50'}
                type={'button'}
                onClick={() => {
                    handleQnATypeChangeButtonClick('nonDev');
                }}
            >
                <span className={`${currentQnAType === 'nonDev' ? 'text-violet-600' : 'text-gray-600'} font-medium`}>
                    비개발
                </span>
            </button>
        </div>
    );
}

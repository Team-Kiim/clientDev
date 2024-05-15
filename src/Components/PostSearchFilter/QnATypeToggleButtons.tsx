import { useSearchParams } from 'react-router-dom';
import { ComputerDesktopIcon, UserIcon } from '@heroicons/react/24/outline';

export default function QnATypeToggleButtons() {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentQnAType = searchParams.get('qna_type') ?? 'dev';

    const handleButtonClick = (targetQnAType: string) => {
        if (targetQnAType === currentQnAType) {
            return;
        }
        searchParams.set('qna_type', targetQnAType);
        setSearchParams(searchParams);
    };

    return (
        <div className={'flex items-center gap-x-2'}>
            <button
                className={`${currentQnAType === 'dev' ? 'border-violet-600 bg-violet-600 text-white' : 'border-gray-300 bg-white text-black'} flex items-center gap-x-1.5 rounded-xl border px-3.5 py-2`}
                type={'button'}
                onClick={() => {
                    handleButtonClick('dev');
                }}
            >
                <ComputerDesktopIcon className={'size-5'} />
                <span className={'text-[0.87rem] font-bold'}>개발</span>
            </button>
            <button
                className={`${currentQnAType === 'nonDev' ? 'border-violet-600 bg-violet-600 text-white' : 'border-gray-300 bg-white text-black'} flex items-center gap-x-1.5 rounded-xl border border-gray-300 px-3.5 py-2`}
                type={'button'}
                onClick={() => {
                    handleButtonClick('nonDev');
                }}
            >
                <UserIcon className={'size-5'} />
                <span className={'text-[0.87rem] font-bold'}>비개발</span>
            </button>
        </div>
    );
}

import { useSearchParams } from 'react-router-dom';
import { ComputerDesktopIcon, UserIcon } from '@heroicons/react/24/outline';

export default function PostTypeToggleButton() {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPostType = searchParams.get('post_type') ?? 'dev';

    const handleButtonClick = (targetPostType: string) => {
        if (targetPostType === currentPostType) {
            return;
        }
        searchParams.set('post_type', targetPostType);
        setSearchParams(searchParams);
    };

    return (
        <div className={'flex h-fit items-center justify-center rounded-lg border border-gray-300 p-1'}>
            <button
                className={`flex cursor-pointer justify-center gap-x-1 rounded px-2 py-1 text-gray-700 transition-all ${currentPostType === 'dev' ? 'bg-gray-200 font-medium' : 'bg-white font-normal'}`}
                type={'button'}
                onClick={() => {
                    handleButtonClick('dev');
                }}
            >
                <ComputerDesktopIcon className={'size-5'} />
                <span className={'text-[0.9rem]'}>개발</span>
            </button>
            <button
                className={`flex cursor-pointer justify-center gap-x-1 rounded px-2 py-1 text-gray-700 transition-all ${currentPostType === 'nonDev' ? 'bg-gray-200 font-medium' : 'bg-white font-normal'}`}
                type={'button'}
                onClick={() => {
                    handleButtonClick('nonDev');
                }}
            >
                <UserIcon className={'size-5'} />
                <span className={'text-[0.9rem]'}>비개발</span>
            </button>
        </div>
    );
}

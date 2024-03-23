import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ComputerDesktopIcon, UserIcon } from '@heroicons/react/24/outline';

export default function PostTypeToggleButton() {
    const [postType, setPostType] = useState('develop');

    const queryClient = useQueryClient();

    const debouncedInvalidateQuery = useCallback(
        debounce((postType: string) => {
            console.log('invalidate', postType);
        }, 300),
        [],
    );

    const handleButtonClick = (targetPostType: string) => {
        setPostType(targetPostType);
        debouncedInvalidateQuery(targetPostType);
    };

    return (
        <div className={'flex items-center justify-center rounded-lg border border-gray-300 p-1'}>
            <button
                className={`flex cursor-pointer justify-center gap-x-1 rounded px-2 py-1 text-gray-700 transition-all ${postType === 'develop' ? 'bg-gray-100 font-medium' : 'bg-white font-normal'}`}
                type={'button'}
                onClick={() => {
                    handleButtonClick('develop');
                }}
            >
                <ComputerDesktopIcon className={'size-5'} />
                <span className={'text-[0.9rem]'}>개발</span>
            </button>
            <button
                className={`flex cursor-pointer justify-center gap-x-1 rounded px-2 py-1 text-gray-700 transition-all ${postType === 'nonDevelop' ? 'bg-gray-100 font-medium' : 'bg-white font-normal'}`}
                type={'button'}
                onClick={() => {
                    handleButtonClick('nonDevelop');
                }}
            >
                <UserIcon className={'size-5'} />
                <span className={'text-[0.9rem]'}>비개발</span>
            </button>
        </div>
    );
}

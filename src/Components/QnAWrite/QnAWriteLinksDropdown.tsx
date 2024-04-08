import { useRef } from 'react';
import { Link } from 'react-router-dom';
import useDropdown from '@/Hooks/useDropdown.ts';

interface Props {
    isDropdownOpen: boolean;
    closeDropdown: () => void;
}

export default function QnAWriteLinksDropdown({ isDropdownOpen, closeDropdown }: Props) {
    const dropDownRef = useRef<HTMLDivElement>(null);

    useDropdown(dropDownRef, isDropdownOpen, closeDropdown);

    return (
        <div
            className={'absolute -left-24 -top-24 z-10 bg-white'}
            onClick={event => event.stopPropagation()}
            ref={dropDownRef}
        >
            <ul className={'flex w-40 flex-col gap-y-2 rounded-lg border border-gray-300 px-1 py-2 text-[0.9rem]'}>
                <Link className={'rounded-lg p-1 font-medium transition-all hover:bg-violet-50'} to={'/qnas/dev/write'}>
                    개발 Q&A 작성
                </Link>
                <Link
                    className={'rounded-lg p-1 font-medium transition-all hover:bg-violet-50'}
                    to={'/qnas/non_dev/write'}
                >
                    비개발 Q&A 작성
                </Link>
            </ul>
        </div>
    );
}

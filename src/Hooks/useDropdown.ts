import { RefObject, useEffect } from 'react';

export default function useDropdown(ref: RefObject<HTMLElement>, isDropdownOpen: boolean, onOutsideClick: () => void) {
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (isDropdownOpen && !ref.current.contains(event.target as Node)) {
                onOutsideClick();
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);
}

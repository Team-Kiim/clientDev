import { useEffect, useRef, useState } from 'react';
import CategorySetButton from '@/Components/PostSearchFilter/Category/CategorySetButton.tsx';
import CategorySetDropdown from '@/Components/PostSearchFilter/Category/CategorySetDropdown.tsx';

export default function CategorySetSection() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const handleCategorySetButtonClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className={'relative flex items-center justify-center'} ref={dropdownRef}>
            <CategorySetButton onCategorySetButtonClick={handleCategorySetButtonClick} />
            {isDropdownOpen && (
                <CategorySetDropdown
                    closeCategorySetDropdown={() => {
                        setIsDropdownOpen(false);
                    }}
                />
            )}
        </div>
    );
}

import { useDropdown } from '@/Hooks/useDropdown.ts';
import CategorySetButton from '@/Components/PostSearchFilter/Category/CategorySetButton.tsx';
import CategorySetDropdown from '@/Components/PostSearchFilter/Category/CategorySetDropdown.tsx';

export default function CategorySetSection() {
    const { dropdownRef, isDropdownOpen, setIsDropdownOpen } = useDropdown<HTMLDivElement>();

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

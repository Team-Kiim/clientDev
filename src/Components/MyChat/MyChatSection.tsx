import { useDropdown } from '@/Hooks/useDropdown.ts';
import MyChatButton from '@/Components/MyChat/MyChatButton.tsx';
import MyChatDropdown from '@/Components/MyChat/MyChatModal/MyChatDropdown.tsx';

export default function MyChatSection() {
    const { dropdownRef, isDropdownOpen, setIsDropdownOpen } = useDropdown<HTMLDivElement>();

    const handleMyChatButtonClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className={'fixed bottom-16 right-36'} ref={dropdownRef}>
            <MyChatButton isDropdownOpen={isDropdownOpen} onMyChatButtonClick={handleMyChatButtonClick} />
            {isDropdownOpen && <MyChatDropdown />}
        </div>
    );
}

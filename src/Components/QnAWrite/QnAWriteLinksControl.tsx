import { useState } from 'react';
import QnAWriteLinksDropdownTriggerButton from '@/Components/QnAWrite/QnAWriteLinksDropdownTriggerButton.tsx';
import QnAWriteLinksDropdown from '@/Components/QnAWrite/QnAWriteLinksDropdown.tsx';

export default function QnAWriteLinksControl() {
    const [isQnAWriteLinksDropdownOpen, setIsQnAWriteLinksDropdownOpen] = useState(false);

    const controlDropdown = () => {
        setIsQnAWriteLinksDropdownOpen(!isQnAWriteLinksDropdownOpen);
    };

    return (
        <div className={'fixed bottom-11 right-40 z-10'}>
            <QnAWriteLinksDropdownTriggerButton controlDropdown={controlDropdown} />
            {isQnAWriteLinksDropdownOpen && (
                <QnAWriteLinksDropdown
                    isDropdownOpen={isQnAWriteLinksDropdownOpen}
                    closeDropdown={() => {
                        setIsQnAWriteLinksDropdownOpen(false);
                    }}
                />
            )}
        </div>
    );
}

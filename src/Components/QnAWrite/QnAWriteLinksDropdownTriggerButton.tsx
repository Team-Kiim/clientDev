import { PlusIcon } from '@heroicons/react/24/outline';

interface Props {
    controlDropdown: () => void;
}

export default function QnAWriteLinksDropdownTriggerButton({ controlDropdown }: Props) {
    return (
        <div className={'tooltip tooltip-bottom'} data-tip={'Q&A 작성'}>
            <button
                className={'rounded-full bg-violet-600 p-2'}
                onClick={event => {
                    event.stopPropagation();
                    controlDropdown();
                }}
                type={'button'}
            >
                <PlusIcon className={'size-11 text-white'} />
            </button>
        </div>
    );
}

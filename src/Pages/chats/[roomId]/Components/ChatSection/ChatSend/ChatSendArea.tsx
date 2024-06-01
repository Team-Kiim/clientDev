import { RiImageEditLine } from 'react-icons/ri';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

export default function ChatSendArea() {
    return (
        <div className={'flex gap-x-3'}>
            <button className={'transition-all active:scale-90'}>
                <RiImageEditLine className={'size-6'} />
            </button>
            <input
                className={'flex-1 rounded-xl border border-gray-300 px-3.5 py-1.5 text-[0.9rem] focus:outline-none'}
                type={'text'}
                placeholder={'채팅 내용을 입력해주세요.'}
                autoCapitalize={'off'}
                autoComplete={'off'}
            />
            <button className={'transition-all active:scale-90'}>
                <ChevronUpIcon className={'size-6 stroke-2'} />
            </button>
        </div>
    );
}

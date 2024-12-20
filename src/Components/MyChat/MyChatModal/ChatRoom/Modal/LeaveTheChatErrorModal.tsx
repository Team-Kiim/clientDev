import { MdOutlineErrorOutline } from 'react-icons/md';

interface Props {
    closeModal(): void;
}

export default function LeaveTheChatErrorModal({ closeModal }: Props) {
    return (
        <div className={'flex h-40 w-64 flex-col gap-y-2 rounded-3xl bg-white px-4 py-5'}>
            <div className={'flex items-center gap-x-1.5'}>
                <MdOutlineErrorOutline className={'size-5 text-rose-500'} />
                <h2 className={'text-[0.9rem] font-bold'}>채팅방 나가기 실패</h2>
            </div>
            <p className={'flex-1 text-[0.75rem] leading-relaxed text-slate-500'}>
                채팅방을 나갈 수 없습니다.
                <br /> 잠시 후에 다시 시도해주세요.
            </p>
            <div className={'flex justify-end gap-x-2'}>
                <button
                    type={'button'}
                    className={
                        'rounded-xl bg-plump-purple-600 px-3 py-1.5 text-[0.7rem] font-bold text-white transition-all hover:scale-105'
                    }
                    onClick={() => {
                        closeModal();
                    }}
                >
                    확인
                </button>
            </div>
        </div>
    );
}

interface Props {
    leaveTheChat({ chatRoomId }: { chatRoomId: string }): void;
    closeModal(): void;
    chatRoomId: string;
}

export default function LeaveTheChatWarningModal({ leaveTheChat, chatRoomId, closeModal }: Props) {
    return (
        <div className={'flex h-40 w-64 flex-col gap-y-2 rounded-3xl bg-white px-4 py-5'}>
            <h2 className={'text-[0.9rem] font-bold'}>채팅방 나가기</h2>
            <p className={'flex-1 text-[0.75rem] leading-relaxed text-slate-500'}>채팅방을 나가시겠습니까?</p>
            <div className={'flex justify-end gap-x-2'}>
                <button
                    type={'button'}
                    className={
                        'rounded-xl bg-slate-100 px-3 py-1.5 text-[0.7rem] font-bold transition-all hover:bg-slate-200'
                    }
                    onClick={() => {
                        closeModal();
                    }}
                >
                    취소
                </button>
                <button
                    type={'button'}
                    className={
                        'rounded-xl bg-plump-purple-600 px-3 py-1.5 text-[0.7rem] font-bold text-white transition-all hover:bg-plump-purple-700'
                    }
                    onClick={() => {
                        leaveTheChat({ chatRoomId });
                        closeModal();
                    }}
                >
                    확인
                </button>
            </div>
        </div>
    );
}

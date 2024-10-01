import Swal from 'sweetalert2';
import { HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi2';
import { RiMenuLine } from 'react-icons/ri';

interface Props {
    isWhiteboardAdded: boolean;

    toggleIsWhiteboardAdded(): void;
}

export default function FormOptionManager({ isWhiteboardAdded, toggleIsWhiteboardAdded }: Props) {
    const handleToggleIsWhiteboardAddedButtonClick = () => {
        if (isWhiteboardAdded) {
            Swal.fire({
                icon: 'warning',
                text: '정말로 시각자료를 삭제하시겠습니까?',
                showCancelButton: true,
                confirmButtonText: '삭제',
                cancelButtonText: '취소',
                customClass: {
                    cancelButton: 'text-black font-bold bg-slate-100',
                    confirmButton: 'text-white font-bold bg-violet-600',
                },
            }).then(result => {
                if (result.isConfirmed) {
                    toggleIsWhiteboardAdded();
                }
            });
        } else {
            toggleIsWhiteboardAdded();
        }
    };

    return (
        <div className={'flex flex-col gap-y-4 rounded-lg border border-slate-300 p-3'}>
            <h2 className={'font-bold'}>추가 옵션</h2>
            <div className={'flex flex-col gap-y-2.5'}>
                <div className={'flex items-center justify-between '}>
                    <span className={'text-[0.93rem] font-bold'}>시각자료</span>
                    <div
                        className={'tooltip tooltip-bottom'}
                        data-tip={isWhiteboardAdded ? '시각자료 삭제' : '시각자료 추가'}
                    >
                        <button
                            className={'rounded-full p-1 transition-all hover:bg-slate-100'}
                            type={'button'}
                            onClick={handleToggleIsWhiteboardAddedButtonClick}
                        >
                            {isWhiteboardAdded ? (
                                <HiOutlineMinus className={'size-6'} />
                            ) : (
                                <HiOutlinePlus className={'size-6'} />
                            )}
                        </button>
                    </div>
                </div>
                <p className={'text-[0.75rem] leading-relaxed text-slate-500'}>
                    • 게시글 내 시각자료를 첨부할 수 있습니다.
                    <br />
                    <span>
                        • 아래 <RiMenuLine className={'inline-block'} /> 버튼을 눌러주세요.
                    </span>
                    <br />• 시각자료 내 라이브러리는 다운받아서 사용해 주세요.
                </p>
            </div>
        </div>
    );
}

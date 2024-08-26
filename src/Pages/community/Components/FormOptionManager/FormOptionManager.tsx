import Swal from 'sweetalert2';
import { HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi2';

interface Props {
    isVoteAdded: boolean;
    isVoteDeletable: boolean;
    toggleIsVoteAdded(): void;
    makeVoteEditable?(): void;
}

export default function FormOptionManager({
    isVoteAdded,
    isVoteDeletable,
    toggleIsVoteAdded,
    makeVoteEditable,
}: Props) {
    const handleToggleIsVoteAddedButtonClick = () => {
        if (isVoteAdded) {
            Swal.fire({
                icon: 'warning',
                text: '정말로 투표를 삭제하시겠습니까?',
                showCancelButton: true,
                confirmButtonText: '삭제',
                cancelButtonText: '취소',
                customClass: {
                    cancelButton: 'text-black font-bold bg-slate-100',
                    confirmButton: 'text-white font-bold bg-violet-600',
                },
            }).then(result => {
                if (result.isConfirmed) {
                    toggleIsVoteAdded();
                    if (makeVoteEditable) {
                        makeVoteEditable();
                    }
                }
            });
        } else {
            toggleIsVoteAdded();
        }
    };

    return (
        <div className={'flex flex-col gap-y-4 rounded-lg border border-slate-300 p-3'}>
            <h2 className={'font-bold'}>추가 옵션</h2>
            <div className={'flex flex-col gap-y-2.5'}>
                <div className={'flex items-center justify-between '}>
                    <span className={'text-[0.93rem] font-bold'}>투표</span>
                    <div
                        className={`tooltip tooltip-bottom ${!isVoteDeletable && 'before:text-[0.8rem]'}`}
                        data-tip={
                            isVoteDeletable
                                ? isVoteAdded
                                    ? '투표 삭제'
                                    : '투표 추가'
                                : '이미 업로드 된 투표는 삭제할 수 없어요.'
                        }
                    >
                        <button
                            className={'rounded-full p-1 transition-all enabled:hover:bg-slate-100 disabled:opacity-50'}
                            type={'button'}
                            onClick={handleToggleIsVoteAddedButtonClick}
                            disabled={!isVoteDeletable}
                        >
                            {isVoteAdded ? (
                                <HiOutlineMinus className={'size-6'} />
                            ) : (
                                <HiOutlinePlus className={'size-6'} />
                            )}
                        </button>
                    </div>
                </div>
                <p className={'text-[0.75rem] leading-relaxed text-slate-500 '}>
                    • 게시글 내 투표를 첨부할 수 있습니다.
                    <br />• 후에 게시글 수정 시, 투표 항목 추가만 가능합니다.
                </p>
            </div>
        </div>
    );
}

import { Link } from 'react-router-dom';
import { MdLockReset } from 'react-icons/md';

interface Props {
    closeModal(): void;
}

export default function PasswordResetCompleteView({ closeModal }: Props) {
    return (
        <div className={'flex flex-col gap-y-8'}>
            <div className={'flex flex-col items-center gap-y-4'}>
                <div className={'rounded-full bg-plump-purple-50 p-1'}>
                    <MdLockReset className={'size-8 text-plump-purple-600'} />
                </div>
                <h1 className={'text-lg font-bold'}>비밀번호 재설정 완료</h1>
                <p className={'text-center text-[0.83rem] text-slate-500'}>
                    이메일로 임시 비밀번호가 전송되었습니다. <br />
                    임시 비밀번호로 로그인해주세요.
                </p>
            </div>
            <div className={'flex w-full justify-center gap-x-2'}>
                <Link
                    className={
                        'hover rounded-xl bg-slate-100 px-4 py-3 text-[0.9rem] font-bold transition-all hover:bg-slate-200'
                    }
                    to={'/'}
                >
                    메인 페이지
                </Link>
                <button
                    className={
                        'rounded-xl bg-plump-purple-600 px-4 py-3 text-[0.9rem] font-bold text-white transition-all hover:bg-plump-purple-700'
                    }
                    type={'button'}
                    onClick={() => {
                        closeModal();
                    }}
                >
                    돌아가기
                </button>
            </div>
        </div>
    );
}

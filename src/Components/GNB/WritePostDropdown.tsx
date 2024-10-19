import { Link } from 'react-router-dom';
import { TbUserQuestion, TbUsers } from 'react-icons/tb';

export default function WritePostDropdown() {
    return (
        <ul
            className={
                'absolute right-0 top-12 z-30 flex w-48 flex-col gap-y-1.5 rounded-xl border border-slate-200 bg-white p-3 text-[0.8rem] font-bold text-slate-700 shadow-lg'
            }
        >
            <Link
                className={
                    'flex w-full items-center gap-x-1.5 rounded-lg p-2 transition-all hover:bg-plump-purple-50 hover:text-plump-purple-600'
                }
                to={'/qnas/write'}
            >
                <TbUserQuestion className={'size-5'} />
                QnA 게시글 작성
            </Link>
            <Link
                className={
                    'flex w-full items-center gap-x-1.5 rounded-lg p-2 transition-all hover:bg-plump-purple-50 hover:text-plump-purple-600'
                }
                to={'/community/write'}
            >
                <TbUsers className={'size-5'} />
                커뮤니티 게시글 작성
            </Link>
        </ul>
    );
}

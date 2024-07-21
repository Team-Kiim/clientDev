import { Link } from 'react-router-dom';
import { HiOutlineBookmark } from 'react-icons/hi';
import { HiOutlineEye, HiOutlineHeart } from 'react-icons/hi2';
import formatNumber from '@/Utils/formatNumber.ts';

export default function PostListItem() {
    return (
        <li className={'w-full border-b border-slate-200 transition-all last:border-none hover:bg-slate-50'}>
            <Link to={'/qnas/11'}>
                <div className={'flex px-3.5 py-4'}>
                    <div className={'flex shrink-0 flex-grow basis-0 flex-col gap-y-1'}>
                        <h1 className={'line-clamp-1 text-[0.95rem] font-extrabold'}>게시글 제목 테스트</h1>
                        <div className={'flex gap-x-1 text-[0.8rem] text-slate-500'}>
                            <span>kkangasdf</span>
                            <span>·</span>
                            <span>2024년 12월 2일</span>
                        </div>
                    </div>
                    <div className={'flex items-center gap-x-2 text-slate-500'}>
                        <div className={'flex items-center gap-x-0.5 text-[0.75rem]'}>
                            <HiOutlineHeart className={'size-[1rem]'} />
                            <span>{formatNumber(10, 0)}</span>
                        </div>
                        <div className={'flex items-center gap-x-0.5 text-[0.75rem]'}>
                            <HiOutlineBookmark className={'size-4'} />
                            <span>{formatNumber(10, 0)}</span>
                        </div>
                        <div className={'flex items-center gap-x-0.5 text-[0.75rem]'}>
                            <HiOutlineEye className={'size-[1rem]'} />
                            <span>{formatNumber(10, 0)}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    );
}

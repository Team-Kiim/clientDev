import { RiQuestionMark } from 'react-icons/ri';

export default function NoPostsMessage() {
    return (
        <div className={'my-20 flex flex-col items-center gap-y-10'}>
            <div
                className={
                    'flex items-center justify-center rounded-full bg-violet-50 p-1.5 shadow-xl shadow-violet-200'
                }
            >
                <RiQuestionMark className={'size-10 text-violet-700'} />
            </div>
            <p className={'text-center text-[0.95rem] font-bold leading-7 text-slate-500'}>
                검색된 게시글이 존재하지 않습니다.
                <br />위 <span className={'text-violet-700'}>글작성</span> 버튼을 눌러 게시글을 작성해주세요.
            </p>
        </div>
    );
}

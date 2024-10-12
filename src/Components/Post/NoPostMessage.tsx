export default function NoPostMessage() {
    return (
        <div className={'flex w-full flex-col items-center gap-y-1.5 py-20'}>
            <h1 className={'text-lg font-extrabold text-slate-800'}>😮 검색된 게시글이 없습니다.</h1>
            <p className={'text-[0.9rem] font-bold leading-relaxed text-slate-400'}>
                다른 키워드로 검색하거나, 관련 게시글을 작성해 보세요.
            </p>
        </div>
    );
}

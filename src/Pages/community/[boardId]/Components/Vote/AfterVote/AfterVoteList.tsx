import { GoDotFill } from 'react-icons/go';

export default function AfterVoteList() {
    return (
        <ul className={'flex flex-col gap-y-3'}>
            <li
                className={
                    'flex w-full items-center gap-x-1.5 rounded-lg border border-slate-200 px-2.5 py-3 transition-all hover:bg-slate-50'
                }
            >
                <GoDotFill className={'size-3 text-slate-400'} />
                <div className={'flex w-full flex-col'}>
                    <span className={'text-[0.85rem]'}>자바스크립트</span>
                    <div className={'flex items-center gap-x-3.5'}>
                        <progress
                            className={
                                'progress w-1/2 bg-slate-300 [&::-moz-progress-bar]:bg-violet-600 [&::-webkit-progress-value]:bg-violet-600'
                            }
                            value={0}
                            max={100}
                        />
                        <div className={'text-[0.75rem]'}>
                            <span>
                                <span className={'font-bold'}>{0}%</span> ( {0}명 투표 )
                            </span>
                        </div>
                    </div>
                </div>
            </li>
            <li
                className={
                    'flex w-full gap-x-1.5 rounded-lg border border-slate-200 px-2.5 py-3 transition-all hover:bg-slate-50'
                }
            >
                <GoDotFill className={'size-3 text-slate-400'} />
                <div className={'flex w-full flex-col'}>
                    <span className={'text-[0.85rem]'}>타입스크립트</span>
                    <div className={'flex w-full items-center gap-x-3.5'}>
                        <progress
                            className={
                                'progress w-1/2 bg-slate-300 [&::-moz-progress-bar]:bg-violet-600 [&::-webkit-progress-value]:bg-violet-600'
                            }
                            value={60}
                            max={100}
                        />
                        <div className={'text-[0.75rem]'}>
                            <span>
                                <span className={'font-bold'}>{60}%</span> ( {180}명 투표 )
                            </span>
                        </div>
                    </div>
                </div>
            </li>
            <li
                className={
                    'flex w-full gap-x-1.5 rounded-lg border border-slate-200 px-2.5 py-3 transition-all hover:bg-slate-50'
                }
            >
                <GoDotFill className={'size-3 text-slate-400'} />
                <div className={'flex w-full flex-col'}>
                    <span className={'text-[0.85rem]'}>파이썬</span>
                    <div className={'flex w-full items-center gap-x-3.5'}>
                        <progress
                            className={
                                'progress w-1/2 bg-slate-300 [&::-moz-progress-bar]:bg-violet-600 [&::-webkit-progress-value]:bg-violet-600'
                            }
                            value={40}
                            max={100}
                        />
                        <div className={'text-[0.75rem]'}>
                            <span>
                                <span className={'font-bold'}>{40}%</span> ( {120}명 투표 )
                            </span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    );
}

import { MdCorporateFare } from 'react-icons/md';
import type CorpInfo from '@/Types/corpInfo.ts';

interface Props {
    corpInfoList: CorpInfo[];
    updateSelectedCorpInfo(corpInfo: CorpInfo): void;
}

export default function SearchedCorpInfoList({ corpInfoList, updateSelectedCorpInfo }: Props) {
    const handleCorpListItemClick = (corpInfo: CorpInfo) => {
        updateSelectedCorpInfo(corpInfo);
    };

    return (
        <ul className={'flex h-full w-full flex-col'}>
            {corpInfoList.map(corpInfo => (
                <li
                    key={corpInfo.corpName}
                    className={
                        'flex gap-x-2 border-b border-slate-200 px-3 py-2.5 transition-all last:border-none hover:bg-slate-100'
                    }
                    onClick={() => {
                        handleCorpListItemClick(corpInfo);
                    }}
                >
                    <div>
                        <MdCorporateFare className={'size-5 text-slate-800'} />
                    </div>
                    <div className={'flex flex-col gap-y-1.5'}>
                        <span className={'text-[0.8rem] font-bold'}>
                            회사명 :{' '}
                            <span
                                className={
                                    'inline-block bg-gradient-to-br from-plump-purple-600 to-rose-500 bg-clip-text text-transparent'
                                }
                            >
                                {corpInfo.corpName}
                            </span>
                        </span>
                        <span className={'text-[0.8rem] font-bold text-slate-800'}>
                            도메인 :{' '}
                            <span
                                className={
                                    'inline-block bg-gradient-to-br from-plump-purple-600 to-rose-500 bg-clip-text text-transparent'
                                }
                            >
                                {corpInfo.corpEmailDomain}
                            </span>
                        </span>
                    </div>
                </li>
            ))}
        </ul>
    );
}

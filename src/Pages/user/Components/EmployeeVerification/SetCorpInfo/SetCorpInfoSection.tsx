import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchCorpInfoInput from '@/Pages/user/Components/EmployeeVerification/SetCorpInfo/SearchCorpInfoInput.tsx';
import SearchedCorpInfoList from '@/Pages/user/Components/EmployeeVerification/SetCorpInfo/SearchedCorpInfoList.tsx';
import fetchCorpInfoList from '@/Pages/user/Components/EmployeeVerification/Utils/fetchCorpInfoList.ts';
import type CorpInfo from '@/Types/corpInfo.ts';

interface Props {
    selectedCorpInfo: CorpInfo;
    updateSelectedCorpInfo(corpInfo: CorpInfo): void;
}

export default function SetCorpInfoSection({ selectedCorpInfo, updateSelectedCorpInfo }: Props) {
    const [query, setQuery] = useState('');

    const [searchCriteria, setSearchCriteria] = useState('domain');

    const {
        data: corpInfoList,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['domainList', { criteria: searchCriteria, query }],
        queryFn: fetchCorpInfoList,
        enabled: query.trim().length !== 0,
        gcTime: 0,
    });

    const handleSearchCriteriaButtonClick = (criteria: string) => {
        setSearchCriteria(criteria);
        setQuery('');
    };

    return (
        <div className={'flex flex-col gap-y-4'}>
            <div className={'flex flex-col gap-y-2'}>
                <div className={'flex justify-end gap-x-2 text-[0.78rem] font-bold'}>
                    <span className={'text-slate-800'}>검색 기준 :</span>
                    <button
                        className={`${searchCriteria === 'domain' ? 'text-plump-purple-600' : 'text-slate-400 hover:text-slate-500'} transition-all`}
                        type={'button'}
                        onClick={() => {
                            handleSearchCriteriaButtonClick('domain');
                        }}
                    >
                        도메인
                    </button>
                    <button
                        className={`${searchCriteria === 'corpName' ? 'text-plump-purple-600' : 'text-slate-400 hover:text-slate-600'} transition-all`}
                        type={'button'}
                        onClick={() => {
                            handleSearchCriteriaButtonClick('corpName');
                        }}
                    >
                        회사명
                    </button>
                </div>
                <SearchCorpInfoInput
                    searchCriteria={searchCriteria}
                    updateQuery={query => {
                        setQuery(query);
                    }}
                />
            </div>
            <div
                className={
                    'relative flex h-44 overflow-y-auto overscroll-y-contain rounded-xl border border-slate-300 scrollbar-hide'
                }
            >
                {query.trim().length === 0 ? (
                    <p
                        className={
                            'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[0.8rem] text-slate-400'
                        }
                    >
                        검색어를 입력하세요.
                    </p>
                ) : (
                    <>
                        {isLoading ? (
                            <div
                                className={
                                    'absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 justify-center'
                                }
                            >
                                <span className={'loading loading-dots loading-md text-slate-500'} />
                            </div>
                        ) : isError ? (
                            <div
                                className={
                                    'absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-y-3'
                                }
                            >
                                <p className={'text-center text-[0.8rem] leading-relaxed text-slate-400'}>
                                    회사 목록을 불러올 수 없습니다.
                                    <br />
                                    잠시 후 다시 시도해주세요.
                                </p>
                                <button
                                    className={
                                        'rounded-3xl bg-plump-purple-600 px-3 py-2 text-[0.78rem] text-white transition-all hover:bg-plump-purple-700'
                                    }
                                    type={'button'}
                                    onClick={() => {
                                        refetch();
                                    }}
                                >
                                    다시 시도
                                </button>
                            </div>
                        ) : corpInfoList.length !== 0 ? (
                            <SearchedCorpInfoList
                                corpInfoList={corpInfoList}
                                updateSelectedCorpInfo={updateSelectedCorpInfo}
                            />
                        ) : (
                            <p
                                className={
                                    'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[0.8rem] text-slate-400'
                                }
                            >
                                검색 결과가 없습니다.
                            </p>
                        )}
                    </>
                )}
            </div>
            <p className={'mx-1 text-[0.83rem] text-slate-500'}>
                선택된 회사/도메인 :{' '}
                {selectedCorpInfo.corpName === '' || selectedCorpInfo.corpEmailDomain === '' ? (
                    <span>회사 정보를 선택해주세요.</span>
                ) : (
                    <>
                        <span
                            className={
                                'inline-block bg-gradient-to-r from-plump-purple-600 to-rose-500 bg-clip-text font-extrabold text-transparent'
                            }
                        >
                            {selectedCorpInfo.corpName}
                        </span>
                        {' / '}
                        <span
                            className={
                                'inline-block bg-gradient-to-r from-plump-purple-600 to-rose-500 bg-clip-text font-extrabold text-transparent'
                            }
                        >
                            {selectedCorpInfo.corpEmailDomain}
                        </span>
                    </>
                )}
            </p>
        </div>
    );
}

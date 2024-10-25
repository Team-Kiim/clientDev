import { useState } from 'react';
import { MdDomain } from 'react-icons/md';
import CorpInfoTable from '@/Pages/admin/manage/domain/Components/CorpInfoTable.tsx';
import RefreshTableButton from '@/Pages/admin/manage/domain/Components/RefreshTableButton.tsx';
import AddCorpInfoModal from '@/Pages/admin/manage/domain/Components/AddCorpInfoModal.tsx';
import { useIsFetching } from '@tanstack/react-query';

export default function Page() {
    const [isAddCorpInfoModalOpen, setIsAddCorpInfoModalOpen] = useState(false);

    const isDataFetching = !!useIsFetching({
        queryKey: ['list', 'corpInfo'],
    });

    return (
        <>
            <div className={'mt-8 flex w-full min-w-[1500px] justify-center'}>
                <div className={'flex w-[60rem] flex-col gap-y-10'}>
                    <div className={'flex items-center gap-x-2'}>
                        <MdDomain className={'size-6'} />
                        <h1 className={'text-lg font-extrabold'}>도메인 관리</h1>
                    </div>
                    <div className={'flex w-full flex-col gap-y-4'}>
                        <div className={'flex w-full justify-between'}>
                            <RefreshTableButton isDataFetching={isDataFetching} />
                            <button
                                className={
                                    'rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-bold text-white transition-all enabled:active:scale-95 disabled:opacity-75'
                                }
                                type={'button'}
                                onClick={() => {
                                    setIsAddCorpInfoModalOpen(!isAddCorpInfoModalOpen);
                                }}
                                disabled={isDataFetching}
                            >
                                회사정보 추가
                            </button>
                        </div>
                        <div className={'flex-1'}>
                            <CorpInfoTable />
                        </div>
                    </div>
                </div>
            </div>
            <AddCorpInfoModal
                isModalOpen={isAddCorpInfoModalOpen}
                closeModal={() => {
                    setIsAddCorpInfoModalOpen(false);
                }}
            />
        </>
    );
}

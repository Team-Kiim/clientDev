import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Tooltip } from '@mui/material';
import { useMemo } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_KO } from 'material-react-table/locales/ko';
import { HiCheck, HiOutlineArchiveBoxXMark, HiOutlineExclamationCircle, HiXMark } from 'react-icons/hi2';
import useCorpInfoListQuery from '@/Pages/admin/manage/domain/Hooks/useCorpInfoListQuery.ts';
import useUpdateStatusMutation from '@/Pages/admin/manage/domain/Hooks/useUpdateStatusMutation.tsx';
import useDeleteCorpInfoMutation from '@/Pages/admin/manage/domain/Hooks/useDeleteCorpInfoMutation.tsx';
import ALERT_STYLE from '@/Constants/alertStyle.ts';

interface CorpInfo {
    id: number;
    name: string;
    emailDomain: string;
    status: 'APPROVED' | 'REJECTED' | 'WAITING';
}

export default function CorpInfoTable() {
    const { data: corpInfoList, isLoading } = useCorpInfoListQuery();

    const { mutate: updateStatus } = useUpdateStatusMutation();

    const { mutate: deleteCorpInfo } = useDeleteCorpInfoMutation();

    const columns = useMemo<MRT_ColumnDef<CorpInfo>[]>(
        () => [
            {
                accessorKey: 'name',
                header: '회사명',
                size: 200,
                Cell: ({ cell }) => {
                    const value = cell.getValue() as string;
                    return (
                        <span
                            className={
                                'bg-gradient-to-r from-plump-purple-600 to-plump-purple-500 bg-clip-text font-bold text-transparent'
                            }
                        >
                            {value}
                        </span>
                    );
                },
            },
            {
                accessorKey: 'emailDomain',
                header: '도메인',
                size: 200,
                Cell: ({ cell }) => {
                    const value = cell.getValue() as string;
                    return (
                        <div className={'w-fit rounded-lg bg-plump-purple-50 px-2 py-1'}>
                            <span
                                className={
                                    'bg-gradient-to-r from-plump-purple-600 to-plump-purple-500 bg-clip-text font-bold text-transparent'
                                }
                            >
                                {value}
                            </span>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'status',
                header: '상태',
                size: 150,
                Cell: ({ cell }) => {
                    const status = cell.getValue() as 'APPROVED' | 'REJECTED' | 'WAITING';
                    return (
                        <div
                            className={`w-fit ${status === 'APPROVED' ? 'bg-emerald-50' : status === 'REJECTED' ? 'bg-rose-50' : 'bg-slate-50'} rounded-lg px-2 py-1`}
                        >
                            <span
                                className={`font-bold ${status === 'APPROVED' ? 'text-emerald-500' : status === 'REJECTED' ? 'text-rose-500' : 'text-slate-500'}`}
                            >
                                {
                                    {
                                        APPROVED: '승인',
                                        REJECTED: '거절',
                                        WAITING: '대기',
                                    }[status]
                                }
                            </span>
                        </div>
                    );
                },
            },
        ],
        [],
    );

    const handleUpdateStatusButtonClick = (id: number, statusToUpdate: 'APPROVED' | 'REJECTED') => {
        withReactContent(Swal)
            .fire({
                title: (
                    <div className={'flex items-center gap-x-2'}>
                        <HiOutlineExclamationCircle className={'size-6 text-amber-500'} />
                        <h1 className={'font-bold'}>{statusToUpdate === 'APPROVED' ? '승인' : '거절'} 확인</h1>
                    </div>
                ),
                html: (
                    <p className={'text-sm text-slate-500'}>
                        정말로 {statusToUpdate === 'APPROVED' ? '승인' : '거절'} 하시겠습니까?
                    </p>
                ),
                customClass: ALERT_STYLE,
                confirmButtonText: '확인',
                cancelButtonText: '취소',
                showCancelButton: true,
            })
            .then(result => {
                if (result.isConfirmed) {
                    updateStatus({
                        id,
                        statusToUpdate,
                    });
                }
            });
    };

    const handleDeleteCorpInfoButtonClick = (id: number) => {
        withReactContent(Swal)
            .fire({
                title: (
                    <div className={'flex items-center gap-x-2'}>
                        <HiOutlineExclamationCircle className={'size-6 text-amber-500'} />
                        <h1 className={'font-bold'}>삭제 확인</h1>
                    </div>
                ),
                html: <p className={'text-sm text-slate-500'}>정말로 삭제하시겠습니까?</p>,
                customClass: ALERT_STYLE,
                confirmButtonText: '확인',
                cancelButtonText: '취소',
                showCancelButton: true,
            })
            .then(result => {
                if (result.isConfirmed) {
                    deleteCorpInfo(id);
                }
            });
    };

    return (
        <>
            <MaterialReactTable
                state={{
                    isLoading,
                }}
                positionActionsColumn={'last'}
                // @ts-ignore
                columns={columns}
                data={corpInfoList ?? []}
                enableColumnFilterModes
                enableColumnOrdering
                enableColumnPinning
                enableRowActions
                enableSelectAll={false}
                localization={MRT_Localization_KO}
                renderRowActions={({ row }) => (
                    <div className={'flex'}>
                        {row.original.status === 'WAITING' ? (
                            <div className={'flex gap-x-2'}>
                                <Tooltip title={'승인'}>
                                    <button
                                        type={'button'}
                                        onClick={() => {
                                            handleUpdateStatusButtonClick(row.original.id, 'APPROVED');
                                        }}
                                    >
                                        <HiCheck className={'size-5'} />
                                    </button>
                                </Tooltip>
                                <Tooltip title={'거절'}>
                                    <button
                                        type={'button'}
                                        onClick={() => {
                                            handleUpdateStatusButtonClick(row.original.id, 'REJECTED');
                                        }}
                                    >
                                        <HiXMark className={'size-5'} />
                                    </button>
                                </Tooltip>
                                <Tooltip title={'삭제'}>
                                    <button
                                        type={'button'}
                                        onClick={() => {
                                            handleDeleteCorpInfoButtonClick(row.original.id);
                                        }}
                                    >
                                        <HiOutlineArchiveBoxXMark className={'size-5'} />
                                    </button>
                                </Tooltip>
                            </div>
                        ) : (
                            <div className={'flex gap-x-2'}>
                                <Tooltip title={'삭제'}>
                                    <button
                                        type={'button'}
                                        onClick={() => {
                                            handleDeleteCorpInfoButtonClick(row.original.id);
                                        }}
                                    >
                                        <HiOutlineArchiveBoxXMark className={'size-5'} />
                                    </button>
                                </Tooltip>
                            </div>
                        )}
                    </div>
                )}
            />
        </>
    );
}

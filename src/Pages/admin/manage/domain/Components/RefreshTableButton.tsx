import { useQueryClient } from '@tanstack/react-query';
import { HiOutlineArrowPath } from 'react-icons/hi2';

interface Props {
    isDataFetching: boolean;
}

export default function RefreshTableButton({ isDataFetching }: Props) {
    const queryClient = useQueryClient();

    const handleRefreshTableButtonClick = () => {
        queryClient.invalidateQueries({
            queryKey: ['list', 'corpInfo'],
        });
    };

    return (
        <div className={'tooltip tooltip-right flex items-center'} data-tip={'새로고침'}>
            <button
                className={'rounded-full p-1 transition-all enabled:hover:bg-slate-100 disabled:opacity-75'}
                type={'button'}
                onClick={handleRefreshTableButtonClick}
                disabled={isDataFetching}
            >
                <HiOutlineArrowPath className={'size-6'} />
            </button>
        </div>
    );
}
